// Entry point for the build script in your package.json
import "@hotwired/turbo"
import "./controllers"

Turbo.setConfirmMethod((message, element, button) => {
  console.log(message, element)

  let confirmText = element.dataset.turboConfirmText
  let description = element.dataset.turboConfirmDescription || ""

  let dialog = document.getElementById("turbo-confirm")
  let confirmField = dialog.querySelector("[data-behavior='confirm-text']")
  let commitButton = dialog.querySelector("button[value='confirm']")

  dialog.querySelector("[data-behavior='title']").textContent = message
  dialog.querySelector("[data-behavior='description']").innerHTML = description
  confirmField.value = ""

  if (confirmText) {
    confirmField.style.display = ""
    commitButton.disabled = true

    confirmField.addEventListener("input", (event) => {
      commitButton.disabled = (event.target.value != confirmText)
    })
  } else {
    confirmField.style.display = "none"
  }

  dialog.showModal()

  return new Promise((resolve, reject) => {
    dialog.addEventListener("close", () => {
      resolve(dialog.returnValue == "confirm")
    }, { once: true })
  })
})
