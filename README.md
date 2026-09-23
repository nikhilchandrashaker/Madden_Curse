# Madden Curse Dataset

## Research question
Did Madden cover athletes experience an unusual decline, injury, suspension, or other negative event in the NFL season immediately following their cover appearance?

## Unit of analysis
One row = one Madden cover athlete in one cover year.

## Important definition
`next_nfl_season` is the NFL season immediately associated with the release of the Madden game. For example, Madden NFL 2001's Eddie George row uses the 2001 NFL season.

## Key variables
- `madden_release_year`: Madden edition/year represented by the cover
- `cover_athlete`: player or John Madden tribute
- `team_on_cover`: team represented on the cover
- `next_nfl_season`: season evaluated for the curse
- `games_played`: regular-season games played
- `key_stat_line`: useful headline statistics
- `what_happened`: major injury, suspension, retirement, or other event
- `season_summary`: short interpretation-free description
- `outcome_category`: broad outcome label
- `curse_event_flag`: 1 if a major injury/absence, suspension, or substantial decline/off-field disruption occurred; 0 otherwise
- `games_missed`: 17 minus games played

## Research cautions
This is a starter dataset for analysis, not a definitive statistical test. The `curse_event_flag` is a human-coded outcome and should be replaced with objective variables where possible. A stronger project should compare each cover athlete with their own previous season and with a matched group of non-cover stars.

Potential extensions:
1. Add previous-season games and production.
2. Calculate percentage change in production.
3. Add All-Pro/Pro Bowl/MVP votes.
4. Add team win percentage and playoff result.
5. Add injury games missed from an objective injury database.
6. Build a matched control group of Pro Bowl/All-Pro players who were not on the Madden cover.
7. Test whether cover athletes' injury/decline rate differs significantly from controls.
