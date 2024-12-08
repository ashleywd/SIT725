// Required globals - loaded via <script> tags in html.
// @requires view.js
// @requires model.js
// @requires jQuery

const Controller = {
    init() {
        View.initModal();
        View.toggleModalTriggerColor();
        
        $('#calculateBtn').on('click', this.handleCalculate.bind(this));
        $('#resetBtn').on('click', this.handleReset.bind(this));
    },
    
    handleCalculate() {
        const num1 = $('#num1').val();
        const num2 = $('#num2').val();
        
        if (num1 && num2) {
            try {
                const result = Model.addTwoNumbers(num1, num2);
                View.showResult(result);
            } catch (error) {
                View.showError('Error calculating result');
            }
        } else {
            View.showError('Please enter both numbers');
        }
    },
    
    handleReset() {
        View.resetModal();
    }
};

$(document).ready(function() {
    Controller.init();
});