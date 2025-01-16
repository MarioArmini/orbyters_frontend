import React from 'react';
import Button from '@mui/material/Button';


export const CustomAnimatedButton = ({ text, StartIcon, EndIcon, backgroundColor, color }) => {
    return (
        <Button
            variant="contained"
            color="primary"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: {backgroundColor},
                color: {color},
                borderRadius: 5,
                '&:hover': {
                    '& .startIcon': {  // Target the startIcon class
                        transform: 'translateX(-100%)',
                        opacity: 0,
                    },
                    '& .endIcon': {  // Target the endIcon class
                        opacity: 1,
                        transform: 'translateX(0)',
                    },
                    '& span': {
                        transform: 'translateX(-15%)',
                        transition: 'transform 0.2s ease-in-out, opacity 0.5s ease-in-out',
                    },
                },
            }}
            onClick={() => alert('Navigating to Documentation')}
        >
            {/* Start Icon Animation */}
            <StartIcon
                className="startIcon"
                sx={{
                    transition: 'transform 0.1s ease-in-out, opacity 0.1s ease-in-out',
                    transformOrigin: 'right center',
                    transform: 'translateX(0)',
                    opacity: 1,
                    mr: 1
                }}
            />

            <span
                style={{ position: 'relative', zIndex: 2 }}
            >
                {text}
            </span>

            {/* End Icon Animation */}
            <EndIcon
                className="endIcon"
                sx={{
                    transition: 'transform 0.1s ease-in-out, opacity 0.1s ease-in-out',
                    opacity: 0,
                    transformOrigin: 'left center',
                    position: 'absolute',
                    right: 0,
                    transform: 'translateX(100%)',
                    mr: 1
                }}
            />
        </Button>
    );
}