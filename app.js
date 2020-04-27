let addBtn = document.getElementById('addBtn');
let subRowContainer = document.getElementsByClassName('sub-row-container')[0];
let subRows = subRowContainer.children;
let template = document.getElementById('temp');
let result = document.getElementById('result');

function validate(subrow) {
    let credit = subrow.getElementsByTagName('input')[0].value;
    let gpa = subrow.getElementsByTagName('input')[1].value;
    if (credit == '') {
        alert('Enter Credit');
        return false;
    }
    if (isNaN(credit)) {
        alert('Enter valid integer in place of Credit');
        return false;
    }
    if (gpa == '') {
        alert('Enter GPA');
        return false;
    }
    if (isNaN(gpa)) {
        alert('Enter valid number in place of GPA');
        return false;
    }
    return true;
}
function getResult(x = 1, closed = false) {
    let totalCredit = (totalGpa = 0);
    if (validate(subRows[subRows.length - x])) {
        for (let i = 0; i < subRows.length - x + 1; i++) {
            let credit = subRows[i].getElementsByTagName('input')[0].value;
            let gpa = subRows[i].getElementsByTagName('input')[1].value;
            totalCredit += parseInt(credit);
            totalGpa += parseFloat(gpa) * parseInt(credit);
        }

        let res = totalGpa / totalCredit;
        res = Math.round((res + Number.EPSILON) * 100) / 100;
        result.textContent = 'CGPA: ' + res;

        if (!closed) {
            subRowContainer.appendChild(template.content.cloneNode(true));
        }
    }
}

function calc() {
    getResult();
}
addBtn.addEventListener('click', calc);

function closex(that) {
    if (subRows.length > 2) {
        console.log(that.parentElement.parentElement.remove());

        let lastRow = subRows[subRows.length - 1];
        let a = lastRow.getElementsByTagName('input')[0].value;
        let b = lastRow.getElementsByTagName('input')[1].value;
        if (a != '' || b != '') {
            subRowContainer.appendChild(template.content.cloneNode(true));
        }
        getResult(2, true);
    } else {
        alert('You need more than two subject to remove one');
    }
}

function valueUpdate(that) {
    if (that.value != '') {
        that.readOnly = true;
        let tmp = that.value;
        that.value = parseFloat(prompt('Enter Updated value')) || tmp;
        getResult(2, true);
    }
}
