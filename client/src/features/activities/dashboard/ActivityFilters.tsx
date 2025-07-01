
import { FilterList, Event } from "@mui/icons-material";
import { Box, ListItemText, MenuItem, MenuList, Paper, Typography } from "@mui/material";
import 'react-calendar/dist/Calendar.css';
import Calendar from "react-calendar"
import { useStore } from "../../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";


const ActivityFilters = observer(function ActivityFilters() {
    const { activityStore: { setfilter, setStartDate, filter, startDate } } = useStore();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, borderRadius: 3 }}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center,mb:1', color: 'primary.main' }}>
                        <FilterList sx={{ mr: 1 }} />
                        Filters

                    </Typography>
                    <MenuList>
                        <MenuItem
                            selected={filter === 'all'}
                            onClick={() => setfilter('all')}
                        >
                            <ListItemText primary='All events' />
                        </MenuItem>
                        <MenuItem
                            selected={filter === 'isGoing'}
                            onClick={() => setfilter('isGoing')}
                        >
                            <ListItemText primary="I'am going" />
                        </MenuItem>
                        <MenuItem
                            selected={filter === 'isHost'}
                            onClick={() => setfilter('isHost')}
                        >
                            <ListItemText primary="I'am hosting" />
                        </MenuItem>
                    </MenuList>
                </Box>
            </Paper >
            <Box component={Paper} sx={{ width: '100%', p: 3, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'primary.main' }}>
                    <Event sx={{ mr: 1 }}></Event>
                    Select date
                </Typography>
                <Calendar
                    value={startDate}
                    onChange={date => setStartDate(date as Date)}
                ></Calendar>
            </Box>
        </Box >
    )
})
export default ActivityFilters
