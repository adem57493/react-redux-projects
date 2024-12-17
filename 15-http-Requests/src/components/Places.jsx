export default function Places({ title, places, fallbackText, onSelectPlace }) {
  console.log(places);
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {places.length > 0 && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                <img src={`http://localhost:3000/${place.image.src}`} alt={place.image.alt} />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );/*Kodda {http://localhost:3000/${place.image.src}`}` yazılmasının sebebi, resim dosyalarının
   backend sunucusunda (http://localhost:3000) saklanıyor olmasıdır*/

   /**Eğer backend'deki bir kod şöyle tanımlandıysa:
javascript
Kodu kopyala
app.use(express.static('public'));
Bu durumda, public klasöründeki tüm dosyalara http://localhost:3000/ üzerinden erişilebilir. Örneğin:

public/forest-waterfall.jpg → http://localhost:3000/forest-waterfall.jpg */
}
