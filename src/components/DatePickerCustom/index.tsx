import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

interface DatePickerCustomProps {
    date: dayjs.Dayjs;
    setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>
}

const DatePickerCustom = ({ date, setDate }: DatePickerCustomProps) => {

    const today = dayjs().subtract(3, "hour");

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DesktopDatePicker']} sx={{ maxWidth: 200 }}>
                <DesktopDatePicker
                    format="DD/MM/YYYY"
                    value={date}
                    onChange={(newValue) => setDate(newValue ? newValue : today)}
                />
            </DemoContainer>
        </LocalizationProvider>
    )

}

export default DatePickerCustom;