const toCurrency = price => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'USD',
    style: 'currency'
  }).format(price)
}

document.querySelectorAll('.price').forEach(node => {
  node.textContent = toCurrency(node.textContent)
})

const $card = document.querySelector('#card')
if($card) {
  $card.addEventListener('click', event => {
    if(event.target.classList.contains('js-remove')) { //Навешиваем проверку на класс js remove
      const id = event.target.dataset.id
      

      fetch('/card/remove/' + id, {
        method: 'delete',
      }).then(res => res.json())
      .then(card => {
        if (card.courses.length) {
          const html = card.courses.map(c => {
            return `
            <tr>
                <td>${c.title}</td>
                <td>${c.count}</td>
                <td>
                    <button class = "btn btm-small js-remove" data-id="${c.id}">Delete</button>
                </td>
            </tr>
            
            `
          }).join('')
          $card.querySelector('tbody').innerHTML = html
          $card.querySelector('.price').textContent = toCurrecy(card.price)
        }else {
          $card.innerHTML = '<p>Корзина пуста</p>'
        }
      })
    }
  })
}

