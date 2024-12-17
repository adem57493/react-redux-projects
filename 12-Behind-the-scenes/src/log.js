export function log(message, level = 0, type = 'component') {
  /**message: Konsola yazılacak olan log mesajıdır.
   * level (default değeri 0): Loglama seviyesini belirtir
   * type (default değeri 'component'): Logun türünü belirtir. component veya other olarak iki
   *  türde kullanılır. Bu, log mesajının stilini değiştirmek için kullanılır
   */
    let styling =/**Bu satır, log mesajı için varsayılan bir stil tanımlar: */
      'padding: 0.15rem; background: #04406b; color: #fcfabd';
  
    if (type === 'other') {
      styling = 'padding: 0.15rem; background: #210957; color: #ede6b2';
    }
  
    const indent = '- '.repeat(level);
    /**
     * Bu satır, log seviyesine (level) göre girinti oluşturur. level parametresi kaçsa,
     *  o kadar kez '- ' ifadesi tekrar edilir ve mesajın başına eklenir. Örneğin:

level = 0 için: Girinti yoktur, mesaj doğrudan yazılır.
level = 1 için: Mesajın başına bir adet '- ' eklenir.
     */
  /**Bu satır, log mesajını konsola yazdırır.  İkinci parametre: Stil tanımı (styling). Bu stil,
   *  %c ile tanımlanan ilk parametreye uygulanır.*/
    console.log('%c' + indent + message, styling);
  }