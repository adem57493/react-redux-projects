import "@/styles/globals.css";
import Layout from '@/components/layout/Layout.js';
/**bu root component sayılır */
export default function App({ Component, pageProps }) {/**Component page contenti tutar dolayısıyla 
  bir sayfayı değiştirdiğimizde farklı olacaktır bu proplar next.js tarafından otomatik olarak verilir */
  return <Layout>
    <Component {...pageProps} />
     </Layout>
}
