
import { IonCardTitle, IonDatetime, IonDatetimeButton, IonPopover } from "@ionic/react";
import { Translation } from "i18nano";
import { useState } from "react";
import Entry from "../../../models/entry/Entry";
import MoodIcon from "../../MoodIcon/MoodIcon";
import MoodInput from "../../MoodInput/MoodInput";
import AddEntryModalStep from "../AddEntryModalStep";
import AddFeelingsPage from "./AddFeelingsPage";


interface Props {
    close: () => void;
    save: (entry: Entry) => Promise<void>;
    entry: Entry;
    prevTitle: string;
}

export default ({entry, close, prevTitle, save}: Props) => {
    const [mood, setMood] = useState(entry.mood ?? 0);
    const title = 'modal.mood';
    const nextComponent = <AddFeelingsPage {...{close, save, prevTitle: title, entry: {...entry, mood}}} />;
    const footer = <MoodInput mood={mood} setMood={setMood} className="ion-padding-horizontal" />;

    return (
        <AddEntryModalStep {...{footer, nextComponent, prevTitle, title, mood, close}}>
            <IonCardTitle className="ion-padding-top ion-text-center">
                <Translation path="modal.howDidYouFeelAtThatMoment" />
            </IonCardTitle>
            <MoodIcon mood={mood} width="100%" height="calc(100% - 132px)" animate={true} />
        </AddEntryModalStep>
    );
}