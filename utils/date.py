# -*- coding: UTF-8 -*- 

import calendar, json, time
calendar.setfirstweekday(calendar.SUNDAY)

dates = {
    "month": {
        "en": {
            "1": "January",
            "2": "February",
            "3": "March",
            "4": "April",
            "5": "May",
            "6": "June",
            "7": "July",
            "8": "August",
            "9": "September",
            "10": "October",
            "11": "November",
            "12": "December"
        },
        "zh": {
            "1": "一月",
            "2": "二月",
            "3": "三月",
            "4": "四月",
            "5": "五月",
            "6": "六月",
            "7": "七月",
            "8": "八月",
            "9": "九月",
            "10": "十月",
            "11": "十一月",
            "12": "十二月"
        }
    },
    "weekday": {
        "en": [
            "S",
            "M",
            "T",
            "W",
            "T",
            "F",
            "S"
        ],
        "zh": [
            "日",
            "一",
            "二",
            "三",
            "四",
            "五",
            "六"
        ]
    },
    "date": {
        "global": {}
    }
}
years = list(range(2000, 2100))
months = list(range(1, 13))
dates["timestamp"] = int(time.time() * 1000)
for year in years:
    for month in months:
        if year not in dates["date"]["global"]:
            dates["date"]["global"][year] = {}
        if month not in dates["date"]["global"][year]:
            dates["date"]["global"][year][month] = calendar.monthcalendar(year, month)
with open("calendar.json", "w", encoding="utf-8") as out_file:
    json.dump(dates, out_file, indent=4, ensure_ascii=False)