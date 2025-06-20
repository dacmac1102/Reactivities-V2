import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";
import ActivityDetailsInfo from "./ActivityDetailsinfo";



export default function ActivityDetailsPage() {
    const { id } = useParams();
    const { activity, isLoadingActivity } = useActivities(id);
    if (isLoadingActivity) return <Typography>Loading...</Typography>
    if (!activity) return <Typography>Activity not found</Typography>
    return (
        <Grid container spacing={3}>
            <Grid size={8}>
                <ActivityDetailsHeader activity={activity}></ActivityDetailsHeader>
                <ActivityDetailsInfo activity={activity}></ActivityDetailsInfo>
                <ActivityDetailsChat></ActivityDetailsChat>
            </Grid>
            <Grid size={4}>
                <ActivityDetailsSidebar></ActivityDetailsSidebar>
            </Grid>

        </Grid>
    )
}
