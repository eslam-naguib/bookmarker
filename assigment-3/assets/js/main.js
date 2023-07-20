var siteName = document.getElementById('sitename')
var siteUrl = document.getElementById('siteUrl')
var tData = document.getElementById('tData')
var submit = document.getElementById('submit')
var cartone = []
var jsonCartona = localStorage.getItem('marked')
var form = document.querySelector('.form-container form')

//  Get Cartona From Local Storage
if (jsonCartona != null) {
  jsonCartona = JSON.parse(jsonCartona)
  cartone = jsonCartona
  for (i = 0; i < cartone.length; i++) {
    var counter = tData.querySelectorAll('tr').length + 1
    tData.innerHTML += `
      <tr>
        <th>${counter}</th>
        <td>${cartone[i]['name']}</td>
        <td> <a href="${cartone[i]['value']}" target="_blank">Visite</a> </td>
        <td> <a href="#" onclick="deleteFromCartona(this.parentElement.parentElement.rowIndex-1)">Delete</a> </td>
      </tr>
  `
  }

}

// Delete Function
var deleteFromCartona = function (itemindex) {
  cartone.splice(itemindex, 1)
  localStorage.setItem('marked', JSON.stringify(cartone))
  tData.querySelectorAll('tr')[itemindex].remove()
}


// Detect Form Submission To Add To The Table
form.addEventListener('submit', function (e) {
  e.preventDefault()
  var counter = tData.querySelectorAll('tr').length + 1

  // Validate URL
  var valid = /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/.test(siteUrl.value);

  if (valid) {

    bookmark = {
      name: siteName.value,
      url: siteUrl.value
    }

    cartone.push(bookmark)
    localStorage.setItem('marked', JSON.stringify(cartone))
    document.getElementById('errorAlert').style.display = 'none'
    tData.innerHTML += `
      <tr>
        <th>${counter}</th>
        <td>${siteName.value}</td>
        <td> <a href="${siteUrl.value}" target="_blank">Visite</a> </td>
        <td> <a href="#" onclick="deleteFromCartona(this.parentElement.parentElement.rowIndex-1)">Delete</a> </td>
      </tr>`

    siteName.value = ''
    siteUrl.value = ''

  } else {
    document.getElementById('errorAlert').style.display = 'block'
  }

})




