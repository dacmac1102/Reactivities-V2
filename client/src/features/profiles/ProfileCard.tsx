import { Link } from "react-router";
import type { Profile } from "../../lib/types"
import { Box, Card, CardContent, CardMedia, Chip, Divider, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";

type Props = {
    profile: Profile
}

export default function ProfileCard({ profile }: Props) {


    return (
        <Link to={`/profiles/${profile.id}`} style={{ textDecoration: 'none' }}>

            <Card
                sx={{
                    borderRadius: 3, p: 3,
                    maxWidth: 250,
                    textDecoration: 'none'
                }}
                elevation={4}>
                <CardMedia
                    component='img'
                    src={profile?.imageUrl || '/images/user.png'}
                    sx={{ width: '100%', zIndex: 50, height: 140, objectFit: 'cover' }}
                    alt={profile.displayName + ' image'}
                >
                </CardMedia>
                <CardContent>
                    <Box display='flex' flexDirection='column' gap={1}>
                        <Typography variant="h5">{profile.displayName}</Typography>
                        {profile.bio && (
                            <Typography
                                variant="body2"
                                sx={{
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {profile.bio}
                            </Typography>
                        )}
                        {profile.following && <Chip size="small" label='Following'
                            color="secondary" variant="outlined"></Chip>}
                    </Box>
                </CardContent>
                <Divider sx={{ mb: 2 }}></Divider>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    <Person></Person>
                    <Typography sx={{ ml: 1 }}>{profile.followersCount} followers</Typography>
                </Box>
            </Card>
        </Link>
    )
}

