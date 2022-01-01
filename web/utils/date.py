import calendar, json
calendar.setfirstweekday(calendar.SUNDAY)

dates = {
    "weekday": [
        "S", "M", "T", "W", "T", "F", "S"
    ],
    "date": {}
}
years = list(range(2000, 2100))
months = list(range(1, 13))
for year in years:
    for month in months:
        if year not in dates["date"]:
            dates["date"][year] = {}
        if month not in dates["date"][year]:
            dates["date"][year][month] = calendar.monthcalendar(year, month)
with open("calendar.json", "w") as out_file:
    json.dump(dates, out_file, indent=4)