const Model = {
  // Calculator
  addTwoNumbers: function (num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
  },

  // Chat
  messages: [],
  addMessage: function (username, message) {
    const newMessage = {
      id: Date.now(),
      username: username || "Anonymous",
      message,
      timestamp: new Date(),
    };
    this.messages.push(newMessage);
    return newMessage;
  },
  getMessages: function () {
    return this.messages;
  },
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    addTwoNumbers: Model.addTwoNumbers,
  };
}
