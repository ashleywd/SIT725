const Controller = {
  init() {
    View.loadNavbar(() => {
      this.initCalculator();
    });
    View.loadFooter();

    // Only initialize chat if we're on the chat page
    if (window.location.pathname.includes("chat.html")) {
      this.initChat();
    }
  },

  initCalculator() {
    $("#calculateBtn").on("click", this.handleCalculate.bind(this));
    $("#resetBtn").on("click", this.handleReset.bind(this));
  },

  initChat() {
    const socket = io();
    const form = $("#form");
    const input = $("#input");

    if (form.length && input.length) {
      form.on("submit", function (e) {
        e.preventDefault();
        if (input.val().trim()) {
          const message = {
            username: "User",
            message: input.val().trim(),
          };
          socket.emit("chat message", message);
          input.val("");
        }
      });

      socket.on("chat message", function (message) {
        View.displayMessage(message);
      });
    }
  },

  handleCalculate() {
    const num1 = $("#num1").val();
    const num2 = $("#num2").val();

    if (num1 && num2) {
      try {
        const result = Model.addTwoNumbers(num1, num2);
        View.showResult(result);
      } catch (error) {
        View.showError("Error calculating result");
      }
    } else {
      View.showError("Please enter both numbers");
    }
  },

  handleReset() {
    View.resetModal();
  },
};

$(document).ready(function () {
  Controller.init();
});
