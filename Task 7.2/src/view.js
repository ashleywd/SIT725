const View = {
  initModal: function () {
    const elems = document.querySelectorAll(".modal");
    const instances = M.Modal.init(elems, {
      dismissible: true,
    });
    return instances;
  },

  toggleModalTriggerColor: function () {
    $(".modal-trigger").on("click", function () {
      $(this).css(
        "background-color",
        $(this).css("background-color") === "rgb(255, 0, 0)" ? "" : "red"
      );
    });
  },

  showResult: function (result) {
    $("#resultText").text(result);
  },

  showError: function (message) {
    M.toast({ html: message, classes: "red" });
  },

  resetModal: function () {
    $("#num1, #num2").val("");
    $("#resultText").text("0");
    M.updateTextFields();
  },

  loadNavbar: function (callback) {
    $("#header").load("/components/navbar.html", () => {
      setTimeout(() => {
        this.initModal();
        this.toggleModalTriggerColor();
        if (callback) callback();
      }, 100);
    });
  },

  loadFooter: function () {
    $("#footer").load("/components/footer.html");
  },

  displayMessage: function (message) {
    const messageList = $("#messages");
    messageList.append(`<li>
      <span class="username">${message.username}:</span>
      <span class="message-text">${message.message}</span>
    </li>`);
    messageList.scrollTop(messageList[0].scrollHeight);
  },
};
