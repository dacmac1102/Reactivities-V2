import { useEffect, useState, type SyntheticEvent } from "react"
import { Link, useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, Card, CardContent, CardMedia, Grid, Tab, Tabs, Typography } from "@mui/material";
import { format } from "date-fns";
import { formatDate } from "../../lib/util/util";

export default function ProfileActivities() {
    const [activeTab, setActiveTab] = useState(0);

    const { id } = useParams();

    const { userActivities, setFilter, loadingUserActivities } = useProfile(id);
    useEffect(() => {
        setFilter('future')
    }, [setFilter])
    const tabs = [
        { menuItem: 'Future Events', key: 'future' },
        { menuItem: 'Past Events', key: 'past' },
        { menuItem: 'Hosting', key: 'hosting' }
    ]
    const handleTabChange = (_: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        setFilter(tabs[newValue].key);
    }
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                    >
                        {tabs.map((tab, index) => (
                            <Tab label={tab.menuItem} key={index}></Tab>
                        ))}
                    </Tabs>
                </Grid>
            </Grid>
            {(!userActivities || userActivities.length === 0) && !loadingUserActivities ? (
                <Typography mt={2}>
                    No activities to show
                </Typography>
            ) : null}
            <Grid container spacing={2} sx={{ marginTop: 2, height: 400, overflow: 'auto' }}>
                {userActivities && userActivities.map((activity: Activity) => (
                    <Grid size={2} key={activity.id}>
                        <Link to={`/activities/${activity.id}`} style={{ textDecoration: 'none' }}>
                            <Card elevation={4}>
                                <CardMedia
                                    component="img"
                                    height="100"
                                    image={`/images/categoryImages/${activity.category}.jpg`}
                                    alt={activity.title}
                                    sx={{ objectFit: 'cover' }}
                                >
                                </CardMedia>
                                <CardContent>
                                    <Typography variant="h6" textAlign="center" mb={1}
                                    >{activity.title}</Typography>
                                    <Typography
                                        variant="body2"
                                        textAlign="center"
                                        display='flex'
                                        flexDirection='column'
                                    >
                                        <span>{formatDate(activity.date)}</span>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>

                ))}
            </Grid>
        </Box >
    )
}
