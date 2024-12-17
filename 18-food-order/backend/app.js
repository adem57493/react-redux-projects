import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();//express uygulamasını başlatıyor

app.use(bodyParser.json());//gelen JSON formatındaki istek gövdelerini ayrıştırır ve req.body içinde kullanılabilir hale getirir
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');//herhangi bir kaynağın bu sunucuya erişmesine izin verir
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');//GET,POST http metodlarına izin verir
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');//isteklerde kullanılabilecek özel başlıkları belirtir
  next();//isteği bir sonraki middlewhare'e geçirir
});

app.get('/meals', async (req, res) => {//avaliable-meals.json dosyasındaki yemek listesini istemcilere sunar
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');//fs.readFile dosyayı asenkron biçimde okur
  res.json(JSON.parse(meals));//JSON.parse() okunan JSON stringini javascript nesnesine dönüştürür
});//res.json JSON formatında yanıt döner

app.post('/orders', async (req, res) => {//req(request) gönderilen veriyi içerir,res(response) istemciye gönderilecek yanıtı içerir
  const orderData = req.body.order;

  if (orderData === null || orderData.items === null || orderData.items.length === 0) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes('@') ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === '' ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === '' ||
    orderData.customer['postal-code'] === null ||//orderData.customer['postal-code'] tire js değişken adlarında geçerli olmadığından şöyle yapmadık orderData.customer.postal-code
    orderData.customer['postal-code'].trim() === '' ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }
//200 staus code=istek başarıyla gönderildi,201 status code -created
  const newOrder = {
    ...orderData,//spread operatörüyle kopyalama
    id: (Math.random() * 1000).toString(),//veri tabanında json dosyalarında kimliklerin genellikle string türünde depolanması tercih edilir
  };
  const orders = await fs.readFile('./data/orders.json', 'utf8');//bu dosyadan içeriğini okur ve string olarak döner
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));//await işlem tamamlanana kadar bekler
  res.status(201).json({ message: 'Order created!' });
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {//OPTIONS isteklerine yanıt verir
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });//tanımlı olmayan endpointe istek yapılırsa
});

app.listen(3000);//3000 portunda dinler
