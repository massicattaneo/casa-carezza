function Node(markup) {
    var div = document.createElement('div');
    div.innerHTML = markup;
    return div.children[0];
}

function getFirstSaturday(year) {
    var counter = 1;
    var firstSaturday = new Date(year + '-01-' + counter);
    while (firstSaturday.getDay() !== 6) {
        firstSaturday = new Date(year + '-01-' + (++counter));
    }
    return firstSaturday;
}

function getFromWeekDate(year, week) {
    var firstSaturday = getFirstSaturday(year);
    var from = new Date(firstSaturday.getTime() + ((week - 1) * 7 * 24 * 60 * 60 * 1000));
    return from;
}

function getWeekDatesString(year, week) {
    var from = getFromWeekDate(year, week);
    var to = new Date(from.getTime() + 7 * 24 * 60 * 60 * 1000);
    return '<strong>Dal ' + from.toLocaleDateString() + ' al ' + to.toLocaleDateString() + '</strong>';
}

function getWeekDates(year, week) {
    return 'ANNO ' + year + ' - SETTIMANA ' + week + 'a:<br/>' + getWeekDatesString(year, week);
}


