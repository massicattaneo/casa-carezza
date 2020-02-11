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

function getPeriods(number) {
    var periods = [
        { number: 1, weeks: [1] },
        { number: 2, weeks: [2, 39] },
        { number: 3, weeks: [3, 40] },
        { number: 4, weeks: [4, 41] },
        { number: 5, weeks: [5, 42] },
        { number: 6, weeks: [6, 43] },
        { number: 7, weeks: [7] },
        { number: 8, weeks: [8] },
        { number: 9, weeks: [9] },
        { number: 10, weeks: [10] },
        { number: 11, weeks: [11] },
        { number: 12, weeks: [12] },
        { number: 13, weeks: [13, 14] },
        { number: 14, weeks: [15, 16] },
        { number: 15, weeks: [22, 23] },
        { number: 16, weeks: [24, 25] },
        { number: 17, weeks: [26, 27] },
        { number: 18, weeks: [28, 29] },
        { number: 19, weeks: [30] },
        { number: 20, weeks: [31, 32, 48, 49] },
        { number: 21, weeks: [33, 34] },
        { number: 22, weeks: [17, 35, 36] },
        { number: 23, weeks: [37, 38] },
        { number: 24, weeks: [50, 51, 52] }
    ];
    if (number) return periods[number - 1];
    return periods;
}

function getAllWeeks() {
    return getPeriods().reduce(function (acc, item) {
        return acc.concat(item.weeks).sort(function (a, b) {
            return a - b;
        });
    }, []);
}

function getAllPeriodWeeks() {
    return {
        number: -1, weeks: getAllWeeks()
    };
}

function refreshYear() {
    var period = document.modulo.period.value;
    var year = document.modulo.year.value;
    document.getElementsByName('period')[0].innerHTML = '';
    var firstSaturday = getFirstSaturday(year);
    var last = new Date(firstSaturday.getTime() + ((52) * 7 * 24 * 60 * 60 * 1000));
    var number = last.getFullYear() === firstSaturday.getFullYear() ? 53 : 52;
    var periodElement = document.getElementsByName('period')[0];
    var weekElement = document.getElementsByName('week')[0];
    ([{ number: -1, title: 'TUTTI' }].concat(getPeriods()).forEach(function (item) {
        periodElement.appendChild(Node('<option value="' + (item.number) + '">' + (item.title || item.number) + '</option>'));
    }));
    [-1].concat(getAllWeeks()).forEach(function (week) {
        weekElement.appendChild(Node('<option value="' + week + '">' + (week === -1 ? 'TUTTE' : week) + '</option>'));
    });
    periodElement.value = period || '-1';
    refreshPeriod();
}

function refreshPeriod() {
    var year = document.modulo.year.value;
    var period = Number(document.modulo.period.value);
    var week = Number(document.modulo.week.value);
    var periodItem = getPeriods(period) || getAllPeriodWeeks();
    var result = document.getElementById('result-find');
    if (period === -1 && week === -1) return result.innerHTML = '';
    var firstSaturday = getFirstSaturday(year);
    var innerHTML = periodItem.weeks
        .filter(function (w) {
            if (week === -1) return true;
            return week === w;
        })
        .map(function (week) {
            var from = new Date(firstSaturday.getTime() + ((week - 1) * 7 * 24 * 60 * 60 * 1000));
            var to = new Date(from.getTime() + 7 * 24 * 60 * 60 * 1000);
            return 'ANNO ' + year + ' - SETTIMANA ' + week + ': <br/> <strong>Dal ' + from.toLocaleDateString() + ' al ' + to.toLocaleDateString() + '</strong>';
        }).join('<hr/>');

    result.innerHTML = innerHTML;
}


refreshYear();
