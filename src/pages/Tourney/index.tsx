import { Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, Button, Stack, Chip, createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import getMPTheme from "./theme/getMPTheme";
import TemplateFrame from "./TemplateFrame";
import logo from "assets/tk_ed_logo_simple.svg";


declare global {
    interface Window {
        bracketsViewer: any,
        inMemoryDatabase: any,
        bracketsManager: any,
        stageFormCreator: (configuration: any, submitCallable: any) => void,
        updateFormCreator: (configuration: any, changeCallable: any) => void,
    }

    interface HTMLElement {
        togglePopover: (force?: boolean | undefined) => boolean
    }

}

// const URL = 'https://raw.githubusercontent.com/Drarig29/brackets-viewer.js/master/demo/db.json';
async function renderTourney(setOpen: React.Dispatch<React.SetStateAction<boolean>>, setDialogData: React.Dispatch<React.SetStateAction<any>>, setParticipant: React.Dispatch<React.SetStateAction<any>>) {
    const data = await axios({
        method: "GET",
        url: "http://localhost:4545/get-tourney",
        params: {
            tournamentId: "13",
        },
    }).then(res => {
        setParticipant(res.data.participant);
        return res.data;
    });

    //TODO: get the user data and change it to participant data's name

    // const data = await fetch(URL).then(res => res.json());
    window.bracketsViewer.addLocale('ko', {
        "common": {
            "round-name": "{{roundNumber}} 라운드 ",
            "group-name-winner-bracket": "승자조",
            "group-name-loser-bracket": "패자조",
            "loser-bracket": "패자조",
            "winner-bracket": "승자조",
            "final-group": "그랜드 파이널",
        }
    });

    // This is optional. You must do it before render().
    window.bracketsViewer.setParticipantImages(data.participant.map((participant: any) => ({
        participantId: participant.id,
        imageUrl: logo,
    })));


    await window.bracketsViewer.render({
        stages: data.stage,
        matches: data.match,
        matchGames: data.match_game,
        participants: data.participant,
    }, {
        customRoundName: (info: any, t: any) => {
            // You have a reference to `t` in order to translate things.
            // Returning `undefined` will fallback to the default round name in the current language.
            if (info.fractionOfFinal === 1 / 2)
                return `${t(`common.${info.groupType}`)} 세미파이널`
            if (info.fractionOfFinal === 1)
                return `${t(`common.${info.groupType}`)} 파이널`
            if (!info.fractionOfFinal)
                return "그랜드 파이널"
            else
                return `${t(`common.${info.groupType}`)} Round ${info.roundNumber}`
        },
        selector: '.brackets-viewer',
        onMatchClick: (match: any) => {
            if (match?.status === 2) {
                setOpen(true);
                setDialogData(match);
            }
        },
        participantOriginPlacement: 'before',
        separatedChildCountLabel: true,
        showSlotsOrigin: true,
        showLowerBracketSlotsOrigin: true,
        highlightParticipantOnHover: true,
    });
}

export default function TourneyPage() {

    const MPTheme = createTheme(getMPTheme("dark"));
    const [open, setOpen] = useState(false);
    const [participant, setParticipant] = useState<any[]>([]);
    const [dialogData, setDialogData] = useState({} as any);
    useEffect(() => {
        renderTourney(setOpen, setDialogData, setParticipant);
    }, []);
    const handleOpen = () => setOpen(open => !open);
    return (
        <TemplateFrame mode={"dark"}>
            <ThemeProvider theme={MPTheme}>
                <CssBaseline enableColorScheme />
                <Stack direction="column" spacing={2} alignItems={"center"}>
                    <Stack direction="row" spacing={2} alignItems="center"  >
                        <Typography variant="h5">참가자</Typography>
                        {participant.map((p: any) => (
                            <Chip key={p.id} label={p.name} />
                        ))}
                    </Stack>
                    <Box className="brackets-viewer" />

                </Stack>
                <Dialog open={open} onClose={handleOpen} >
                    <DialogTitle align="center">{dialogData?.metadata?.label}</DialogTitle>
                    <DialogContent style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1rem",
                    }}>
                        <DialogContentText>
                            경기의 승자를 눌러주세요.
                        </DialogContentText>
                        <Stack direction="row" spacing={2} >
                            <Button
                                variant="outlined"
                                onClick={() => {
                                }}>{(participant.find((p: any) => p?.id === dialogData?.opponent1?.id))?.name}</Button>
                            <Button
                                variant="outlined">{(participant.find((p: any) => p?.id === dialogData?.opponent2?.id))?.name}</Button>
                        </Stack>
                    </DialogContent>
                </Dialog>
            </ThemeProvider>
        </TemplateFrame>
    );
}