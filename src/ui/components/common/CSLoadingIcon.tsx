import {
    Box,
    BoxProps
} from "@mui/material";
import React, {
    useEffect,
    useState
} from "react";
import { useNavigation } from "react-router-dom";
import downIcon from "../../images/cs_logo_down.png";
import upIcon from "../../images/cs_logo_up.png";

interface CSLoadingIconProps extends BoxProps {
    loadRotationMilliseconds?: number;
}

const CSLoadingIcon: React.FC<CSLoadingIconProps> = ({
    loadRotationMilliseconds = 600,
    ...props
}) => {
    const navigation = useNavigation();
    const [iconIndex, setIconIndex] = useState(0);
    
    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;
        
        if (navigation.state === "loading") {
            intervalId = setInterval(() => {
                setIconIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
            }, loadRotationMilliseconds / 3);
        }
        
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [navigation.state, loadRotationMilliseconds]);
    
    const getAnimationStyle = () => {
        if (navigation.state === "loading") {
            return {
                animation: `wobble infinite ${loadRotationMilliseconds}ms alternate`,
                "@keyframes wobble": {
                    "0%": {
                        transform: "rotate(0deg)"
                    },
                    "100%": {
                        transform: "rotate(4deg)"
                    }
                }
            };
        } else {
            return {};
        }
    };
    
    const style = getAnimationStyle();
    
    return (
        <Box
            component="img"
            src={navigation.state === "loading" && iconIndex === 1 ? downIcon : upIcon}
            alt="CineSplain Icon"
            sx={style}
            {...props}
        />
    );
};

export default CSLoadingIcon;
