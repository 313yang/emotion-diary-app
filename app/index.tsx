import BottomPlusButton from "@/components/BottomPlusButton";
import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Alert, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";

interface diaryType {
  id: string;
  text: string;
}
const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [currentMonth, setCurrentMonth] = useState(format(new Date(), "yyyy-MM"));

  const handleDayPress = (day: { dateString: string }) => {
    if (day.dateString === currentDate) {
      Alert.alert("Selected Date", `You selected ${day.dateString}`);
    }
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth + "-01");
    newMonth.setMonth(newMonth.getMonth() + (direction === "prev" ? -1 : 1));
    setCurrentMonth(format(newMonth, "yyyy-MM"));
  };
  const [diaryList, setDiaryList] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [days, setDays] = useState([]);
  const [limitDays, setLimitDays] = useState(
    new Date(year, month - 1, 1).getDay() - new Date(year, month, 0).getDate()
  );
  const [selectedDay, setSelectedDay] = useState(null);
  const [userId, setUserId] = useState("");
  const WEEKDAY = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  useEffect(() => {
    let dayArr = [];
    let dummyArr = [];
    const firstDay = new Date(year, month - 1, 1).getDay();
    const lastDay = new Date(year, month, 0).getDate();
    setLimitDays(firstDay + lastDay);
    for (let i = 1; i <= firstDay; i++) {
      dummyArr.push({ date: null, week: WEEKDAY[i] });
    }
    if (diaryList)
      for (let i = 1; i < new Date(+year, +month, 0).getDate() + 1; i++) {
        dayArr.push({
          date: `${year}${month < 10 ? `0${month}` : month}${i < 10 ? `0${i}` : i}`,
          week: WEEKDAY[new Date(`${year}-${month}-${i < 10 ? `0${i}` : i}`).getDay()],
        });
        for (let j = 0; j < diaryList.length; j++) {
          if (diaryList[j].date === `${year}${month}${i < 10 ? `0${i}` : i}`)
            dayArr[i - 1] = { ...dayArr[i - 1], ...diaryList[j] };
        }
      }

    setDays([...dummyArr, ...dayArr]);
  }, [year, month, diaryList]);


 
  const handleSetNextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };
  const handleSetPrevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  return (
    <View style={styles.CalendarContainer}>
        <View style={styles.CalendarHeader}>
          <button onClick={handleSetPrevMonth}>&lt;</button>
          <h1>
            {year}년 {month}월
          </h1>
          <button onClick={handleSetNextMonth}>&gt;</button>
        </View>
        <View style={styles.calendar}>
          <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}} >
            {WEEKDAY.map((days) => (
              <View  style={styles.calendarGrid} key={days}>{days}</View>
            ))}
          </View>
          <View style={{flexDirection: "row",  flexWrap: 'wrap',  width: "100%"}} >
            {days.map((day, index) => (
              <View  style={styles.calendarGrid}
                // isAfter={moment(day.date).isAfter(moment().format("YYYYMMDD"))}
                onClick={() =>{}
                  // !moment(day.date).isAfter(moment().format("YYYYMMDD")) && setSelectedDay(day)
                }
                key={index}
                // week={day?.week}
              >
               
                <div>
                  <h4> {day?.date?.slice(-2)} </h4>{" "}
                  {/* <button style={{ display: "flex" }}>
                    <img className="todoIcon" src={todoIcon} />
                  </button> */}
                </div>
                {day?.face && <Image className="faceIcon" src={`./assets/images/emotion_${day?.face}.svg`} />}
                <p>{day?.text}</p>
              </View>
            ))}
          </View>
        </View>
    </View>
  );
};
const EmojiDiaryApp = () => {
  const [selectedEmojis, setSelectedEmojis] = useState("");
  const [diaryEntries, setDiaryEntries] = useState<diaryType[]>([]);


  return (
    <View style={styles.container}>

     <CalendarComponent />
      {/* <BottomPlusButton onPress={()=>{}} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    fontFamily: "SeHyun",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center", 
  },
  CalendarContainer: {
    flex: 1,
    padding: 20,
    fontFamily: "SeHyun",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",

  },
  CalendarHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginTop: 30,
    marginBottom: 30,
    fontFamily: "SeHyun",
    fontSize: 20,
    fontWeight: "bold",
  },
  calendar: {
    marginTop: 30,
    marginBottom: 30,
    width: "100%",
    borderRadius: 4,
    borderColor: "#000",
    borderWidth: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarWeek: {
    width: `${100 / 7}%`, // 7등분
    aspectRatio: 1,       // 정사각형 (원하면 제거 가능)
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarGrid: {
    width: `${100 / 7}%`, // 7등분
    aspectRatio: 1,       // 정사각형 (원하면 제거 가능)
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default EmojiDiaryApp;
