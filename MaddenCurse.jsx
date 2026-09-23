import { useState } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;800&family=Barlow:wght@400;600&display=swap');
.mc{--bg:#f1f3ec;--ink:#1b2a22;--mute:#5d6b62;--line:#cdd5c8;--card:#fbfcf8;--red:#c8102e;--amb:#d99a00;--grn:#2e7d4f;--gry:#98a29b;background:var(--bg);color:var(--ink);font:16px/1.55 Barlow,system-ui,sans-serif;min-height:100vh}
@media (prefers-color-scheme:dark){.mc{--bg:#111a15;--ink:#e8eee6;--mute:#93a198;--line:#2b3a31;--card:#18241d;--red:#ff5a6e;--amb:#f0b429;--grn:#4cc282;--gry:#66736b}}
.mc *{box-sizing:border-box}
.mc main{max-width:920px;margin:0 auto;padding:32px 20px 64px}
.mc h1,.mc h2{font-family:"Barlow Condensed",Impact,sans-serif;line-height:1;margin:0}
.mc h1{font-size:clamp(44px,9vw,84px);font-weight:800;letter-spacing:-.01em}
.mc h2{font-size:30px;font-weight:800;margin-bottom:6px}
.mc section{margin-top:56px}
.mc .lede{color:var(--mute);max-width:62ch;margin:6px 0 18px}
.mc .hero p{font-size:19px;max-width:56ch}
.mc .big{display:flex;gap:28px;flex-wrap:wrap;margin-top:22px;border-top:3px solid var(--ink);padding-top:14px}
.mc .big div{min-width:120px}
.mc .big b{font:800 46px/1 "Barlow Condensed",sans-serif;display:block}
.mc .big span{color:var(--mute);font-size:14px}
.mc .strip{display:flex;gap:10px;overflow-x:auto;padding:4px 2px 14px}
.mc .card{flex:0 0 132px;background:var(--card);border:1px solid var(--line);border-top:6px solid var(--gry);border-radius:4px;padding:10px;text-align:left;font:inherit;color:inherit;cursor:pointer}
.mc .card:focus-visible,.mc .card[aria-pressed=true]{outline:2px solid var(--ink)}
.mc .card .y{font:800 22px/1 "Barlow Condensed",sans-serif}
.mc .card .n{font-weight:600;font-size:14px;margin-top:4px;line-height:1.2}
.mc .card .c{font-size:12px;color:var(--mute);margin-top:4px}
.mc .red{border-top-color:var(--red)}.mc .amb{border-top-color:var(--amb)}.mc .grn{border-top-color:var(--grn)}
.mc .legend{display:flex;gap:16px;flex-wrap:wrap;font-size:14px;color:var(--mute);margin-bottom:8px}
.mc .legend i{display:inline-block;width:12px;height:12px;border-radius:2px;margin-right:6px;vertical-align:-1px}
.mc .detail{background:var(--card);border:1px solid var(--line);border-left:6px solid var(--gry);padding:12px 14px;border-radius:4px;min-height:74px}
.mc .row{display:grid;grid-template-columns:150px 1fr 44px;align-items:center;gap:10px;margin:5px 0;font-size:14px}
.mc .row.wide{grid-template-columns:170px 1fr 60px}
.mc .row .t{background:var(--line);height:16px;border-radius:2px;overflow:hidden}
.mc .row .t i{display:block;height:100%}
.mc .empty{border:2px dashed var(--line);padding:18px;border-radius:4px}
.mc .empty ul,.mc ul.note{margin:8px 0 0;padding-left:20px}
.mc small,.mc .note{color:var(--mute);font-size:14px}
.mc .tag{display:inline-block;border:1px solid var(--line);border-radius:3px;padding:0 6px;font-size:13px;margin-left:6px}
@media(max-width:560px){.mc .row{grid-template-columns:104px 1fr 34px;font-size:13px}.mc .row.wide{grid-template-columns:110px 1fr 50px}}
`;

const DATA = [{"y":2001,"n":"Eddie George","p":"RB","s":2001,"g":16,"c":"Decline","f":0,"w":"No major injury; production dropped sharply from 1,509 yards in 2000","k":"939 rushing yards, 5 TD"},{"y":2002,"n":"Daunte Culpepper","p":"QB","s":2002,"g":11,"c":"Injury + decline","f":1,"w":"Missed 5 games with a knee injury","k":"2,612 pass yards, 18 TD, 23 INT"},{"y":2003,"n":"Marshall Faulk","p":"RB","s":2003,"g":11,"c":"Injury + decline","f":1,"w":"Missed 5 games","k":"818 rushing yards, 10 TD; 290 receiving yards"},{"y":2004,"n":"Michael Vick","p":"QB","s":2004,"g":15,"c":"Mixed","f":0,"w":"No major injury","k":"2,313 pass yards, 14 TD; 902 rush yards, 6 TD"},{"y":2005,"n":"Ray Lewis","p":"LB","s":2005,"g":15,"c":"Mixed","f":0,"w":"Missed 1 game","k":"88 tackles, 3.5 sacks"},{"y":2006,"n":"Donovan McNabb","p":"QB","s":2006,"g":10,"c":"Injury","f":1,"w":"Season-ending ACL injury","k":"2,542 pass yards, 18 TD, 6 INT"},{"y":2007,"n":"Shaun Alexander","p":"RB","s":2007,"g":10,"c":"Injury + decline","f":1,"w":"Missed 6 games with injuries","k":"716 rushing yards, 4 TD"},{"y":2008,"n":"Vince Young","p":"QB","s":2008,"g":3,"c":"Injury + benching","f":1,"w":"Missed most of season; injured quadriceps/leg early","k":"219 pass yards, 1 TD, 2 INT"},{"y":2009,"n":"Brett Favre","p":"QB","s":2009,"g":16,"c":"Strong season","f":0,"w":"No major injury","k":"4,202 pass yards, 33 TD, 7 INT"},{"y":2010,"n":"Troy Polamalu","p":"S","s":2010,"g":14,"c":"Strong season","f":0,"w":"Missed 2 games","k":"63 tackles, 1 INT"},{"y":2010,"n":"Larry Fitzgerald","p":"WR","s":2010,"g":16,"c":"Strong individual season","f":0,"w":"No major injury","k":"90 receptions, 1,137 yards, 6 TD"},{"y":2011,"n":"Drew Brees","p":"QB","s":2011,"g":16,"c":"Strong season","f":0,"w":"No major injury","k":"5,476 pass yards, 46 TD"},{"y":2012,"n":"Peyton Hillis","p":"RB","s":2012,"g":15,"c":"Major decline","f":1,"w":"Missed 1 game","k":"309 rushing yards, 1 TD"},{"y":2013,"n":"Calvin Johnson","p":"WR","s":2013,"g":14,"c":"Strong season","f":0,"w":"Missed 2 games","k":"1,492 receiving yards, 12 TD"},{"y":2014,"n":"Barry Sanders","p":"RB","s":2014,"g":0,"c":"Retired","f":0,"w":"Retired long before 2014","k":"Retired; no NFL statistics"},{"y":2014,"n":"Adrian Peterson","p":"RB","s":2014,"g":1,"c":"Suspension","f":1,"w":"Suspended after one game","k":"21 rushing attempts, 75 yards"},{"y":2015,"n":"Richard Sherman","p":"CB","s":2015,"g":16,"c":"Strong season","f":0,"w":"No major injury","k":"2 INT, 14 passes defended"},{"y":2016,"n":"Odell Beckham Jr.","p":"WR","s":2016,"g":16,"c":"Strong season","f":0,"w":"No major injury","k":"101 receptions, 1,367 yards, 10 TD"},{"y":2017,"n":"Rob Gronkowski","p":"TE","s":2017,"g":14,"c":"Strong season","f":0,"w":"Missed 2 games","k":"69 receptions, 1,084 yards, 8 TD"},{"y":2018,"n":"Tom Brady","p":"QB","s":2018,"g":16,"c":"Strong season","f":0,"w":"No major injury","k":"4,355 pass yards, 29 TD, 11 INT"},{"y":2019,"n":"Antonio Brown","p":"WR","s":2019,"g":1,"c":"Off-field + decline","f":1,"w":"Released after offseason incidents; played one game for Patriots","k":"4 receptions, 56 yards"},{"y":2020,"n":"Patrick Mahomes","p":"QB","s":2020,"g":15,"c":"Strong season","f":0,"w":"No major injury","k":"4,740 pass yards, 38 TD, 6 INT"},{"y":2021,"n":"Lamar Jackson","p":"QB","s":2021,"g":12,"c":"Injury + team decline","f":1,"w":"Missed final 4 games with ankle injury","k":"2,882 pass yards, 16 TD; 767 rush yards, 2 TD"},{"y":2022,"n":"Tom Brady","p":"QB","s":2022,"g":17,"c":"Strong individual season","f":0,"w":"No major injury","k":"4,694 pass yards, 25 TD, 9 INT"},{"y":2022,"n":"Patrick Mahomes","p":"QB","s":2022,"g":17,"c":"Strong season","f":0,"w":"No major injury","k":"5,250 pass yards, 41 TD"},{"y":2023,"n":"John Madden","p":"Coach","s":2023,"g":0,"c":"Not applicable","f":0,"w":NaN,"k":NaN},{"y":2024,"n":"Josh Allen","p":"QB","s":2024,"g":17,"c":"Strong team season","f":0,"w":"No major injury","k":"3,731 pass yards, 28 TD, 18 INT; 531 rush yards, 12 rush TD"},{"y":2025,"n":"Christian McCaffrey","p":"RB","s":2025,"g":17,"c":"Strong season","f":0,"w":"No major injury","k":"1,202 rushing yards, 13 TD; 58 receptions, 468 yards"}];

const isExcluded = (d) => /Retired|Not applicable/.test(d.c);
const status = (d) => (isExcluded(d) ? "" : d.f ? "red" : /Decline|Mixed/.test(d.c) ? "amb" : "grn");
const seasonLen = (d) => (d.s >= 2021 ? 17 : 16);
const missed = (d) => Math.max(0, seasonLen(d) - d.g);
const pct = (a, b) => (b ? Math.round((100 * a) / b) : 0);
const COLOR = { red: "var(--red)", amb: "var(--amb)", grn: "var(--grn)", "": "var(--gry)" };

const Bar = ({ label, value, text, color, wide }) => (
  <div className={`row ${wide ? "wide" : ""}`}>
    <span>{label}</span>
    <div className="t"><i style={{ width: `${value}%`, background: color }} /></div>
    <span>{text}</span>
  </div>
);

export default function MaddenCurse() {
  const [sel, setSel] = useState(null);

  const E = DATA.filter((d) => !isExcluded(d));
  const N = E.length;
  const flagged = E.filter((d) => d.f);
  const broad = E.filter((d) => d.f || status(d) === "amb");
  const m3 = E.filter((d) => missed(d) >= 3);
  const good = E.filter((d) => status(d) === "grn");
  const eras = [[2001, 2005], [2006, 2010], [2011, 2015], [2016, 2020], [2021, 2025]];
  const d = sel === null ? null : DATA[sel];

  return (
    <div className="mc">
      <style>{CSS}</style>
      <main>
        <header className="hero">
          <h1>The Madden Curse</h1>
          <p>Do Madden cover athletes have a worse season right after the cover? This page tests the claim with the starter dataset (Madden 2001–2025).</p>
          <div className="big">
            <div><b>{flagged.length} of {N}</b><span>flagged curse events ({pct(flagged.length, N)}%)</span></div>
            <div><b>{m3.length} of {N}</b><span>missed 3+ games ({pct(m3.length, N)}%)</span></div>
            <div><b>{good.length} of {N}</b><span>normal or strong seasons</span></div>
          </div>
        </header>

        <section>
          <h2>Every cover athlete, one season later</h2>
          <p className="lede">Each card is one cover. Select a card for what happened.</p>
          <div className="legend">
            <span><i style={{ background: "var(--red)" }} />Curse event (flagged)</span>
            <span><i style={{ background: "var(--amb)" }} />Decline or mixed, not flagged</span>
            <span><i style={{ background: "var(--grn)" }} />Normal or strong</span>
            <span><i style={{ background: "var(--gry)" }} />Excluded from rates</span>
          </div>
          <div className="strip">
            {DATA.map((x, i) => (
              <button key={i} className={`card ${status(x)}`} aria-pressed={sel === i} onClick={() => setSel(i)}>
                <div className="y">{x.y}</div>
                <div className="n">{x.n}</div>
                <div className="c">{x.c}</div>
              </button>
            ))}
          </div>
          <div className="detail" aria-live="polite" style={{ borderLeftColor: d ? COLOR[status(d)] : undefined }}>
            {d ? (
              <>
                <b>{d.n}</b> ({d.p}), Madden {d.y}, {d.s} season<span className="tag">{d.g} games played</span>
                <br />{d.w}.<br /><small>{d.k}</small>
              </>
            ) : "Select a card to see the details."}
          </div>
        </section>

        <section>
          <h2>Games missed</h2>
          <p className="lede">Missed games are measured against the real season length: 16 games through 2020, 17 from 2021. The dataset's own <code>games_missed</code> uses 17 for every year, which overstates misses in earlier seasons.</p>
          {E.map((x, i) => (
            <Bar key={i} label={`${x.n} '${String(x.y).slice(2)}`} value={(missed(x) / 16) * 100} text={missed(x)} color={missed(x) >= 3 ? COLOR[status(x)] : "var(--gry)"} />
          ))}
          <p className="note">Colored bars are 3 or more missed games.</p>
        </section>

        <section>
          <h2>Curse rate by era</h2>
          <p className="lede">Share of cover athletes with a flagged curse event in each five-year window.</p>
          {eras.map(([a, b]) => {
            const g = E.filter((x) => x.y >= a && x.y <= b);
            const f = g.filter((x) => x.f).length;
            return <Bar key={a} wide label={`${a}–${String(b).slice(2)}`} value={pct(f, g.length)} text={`${f}/${g.length}`} color="var(--red)" />;
          })}
          <p className="note">Each window holds only 4 to 7 players, so one player moves a bar by 15 to 25 points.</p>
        </section>

        <section>
          <h2>How much depends on the definition?</h2>
          <p className="lede">The headline rate changes with how "curse" is defined. All three use the same set of players.</p>
          <Bar wide label="Flagged in dataset" value={pct(flagged.length, N)} text={`${flagged.length}/${N}`} color="var(--red)" />
          <Bar wide label="Flagged + decline/mixed" value={pct(broad.length, N)} text={`${broad.length}/${N}`} color="var(--amb)" />
          <Bar wide label="Missed 3+ games" value={pct(m3.length, N)} text={`${m3.length}/${N}`} color="var(--gry)" />
        </section>

        <section>
          <h2>Cover athletes vs. similar stars</h2>
          <div className="empty">
            <b>This is the real test, and it needs data the file doesn't have yet.</b>
            <p className="note" style={{ margin: "6px 0 0" }}>A rate of about one in three only means something next to a baseline. Adding the following would fill this panel:</p>
            <ul>
              <li>Non-cover Pro Bowl / All-Pro players from the same seasons, matched by position and prior-year production</li>
              <li>Their games missed, injuries and production change in the following season</li>
              <li>Each cover athlete's prior-season stats, so decline is measured objectively rather than hand-coded</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Read with care</h2>
          <ul className="note">
            <li>The curse flag is hand-coded. Eddie George lost 38% of his rushing yards and is unflagged, while Peyton Hillis is flagged for a decline.</li>
            <li>Barry Sanders (retired long before) and the John Madden tribute are excluded because a next-season test doesn't apply.</li>
            <li>Tom Brady and Patrick Mahomes each appear twice, so those rows are not fully independent.</li>
            <li>Star players are often injured or decline after a career-best year (regression to the mean), which happens with or without a cover.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
