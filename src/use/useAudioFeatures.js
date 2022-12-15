const keys_table = {0: 'C', 1: 'C#', 2: 'D', 3: 'D#', 4: 'E', 5: 'F', 6: 'F#', 7: 'G', 8: 'G#', 9: 'A', 10: 'A#', 11: 'B'};

export function useTrackKey(track_features){
    return keys_table[track_features.key] + (track_features.mode == 1 ? '' : 'm');
}

export function useTrackMood(track_features){
    console.log(track_features)
}