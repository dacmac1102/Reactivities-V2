import { ListItem, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5002/api/activities')
      .then(response => setActivities(response.data))
    return () => { }
  }, [])

  return (
    <>
      <Typography variant='h3'>Reactities</Typography>
      <ul>
        {activities.map((activity) => (
          <ListItem key={activity.id}>{activity.title} </ListItem>
        ))}
      </ul>
    </>
  )
}

export default App
