import { createTheme, ThemeProvider } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

interface DatePickerCustomProps {
    date: dayjs.Dayjs;
    setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>
}

const DatePickerCustom = ({ date, setDate }: DatePickerCustomProps) => {

    const newTheme = createTheme(
        {
            palette: {
                primary: { main: "#8B4513" },
            }
        }
    );

    const today = dayjs().subtract(3, "hour");

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={newTheme}>
                <DemoContainer
                    components={['DesktopDatePicker']}
                    sx={{
                        bgcolor: "white",
                        maxWidth: 200,
                        p: 0,
                        boxShadow: "rgba(0, 0, 0, 0.1) 0px 3px 8px",
                    }}
                >
                    <DesktopDatePicker
                        format="DD/MM/YYYY"
                        value={date}
                        onChange={(newValue) => setDate(newValue ? newValue : today)}
                        sx={{
                            border: "none"
                        }}
                    />
                </DemoContainer>
            </ThemeProvider>
        </LocalizationProvider>
    )

}

export default DatePickerCustom;