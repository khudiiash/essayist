let phrasalPrepositions = '(?:about|away|across|after|against|along|ahead|around|back|between|beyond|by|down|for|forward|from|in|into|off|on|out|over|outside|through|together|towards|under|up)'
let extra = '(\\s(?:it|him|her(\\s\\w+){0,2}|me|my(\\s\\w+){0,2}|them|their(\\s\\w+){0,2}|these(\\s\\w+){0,2}|that|this(\\s\\w)?|those(\\s\\w+){0,2}|the(\\s\\w+){0,2}))?'

let phrasalVerbs = [
`(?:ask|asks|asked|asking) (?:for|after|about|around|round|in|out|up)`,
`(?:add|adds|added|adding) (?:on|up|up to)`,
`(?:back|backs|backed|backing) off`,
`(?:beat|beats|beaten|beating) up`,
`(?:beating|beef|beefs|beefed|beefing) up`,
`(?:bend|bends|bent|bending) (?:down|for|over)`,
`(?:bite|bites|bit|biting) off`,
`(?:blow|blows|blew|blowing)${extra} (?:away|off|out|up)`,
`(?:boil|boils|boiled|boiling) down`,
`(?:break|breaks|broke|breaking) (?:away|down|in|off|out|through)`,
`(?:bring|brings|brought|bringing)${extra} (?!about)${phrasalPrepositions}`,
`(?:brush|brushes|brushed|brushing)${extra} (?:off|up)`,
`(?:brush|brushes|brushed|brushing) up`,
`(?:build|builds|built|building)${extra} (?:in|into|up)`,
`(?:bump|bumps|bumped|bumping) (?:into|down|out|up)`,
`(?:burst|bursts|burst|bursting) out`,
`(?:butt|butts|butt|butting) in`,
`(?:call|calls|called|calling)${extra} (?!off)${phrasalPrepositions}`,
`(?:calm|calms|calmed|calming) down`,
`(?:care|cares|cared|caring) for`,
`(?:carry|carries|carried|carrying)${extra} (?:away|out)`,
`(?:catch|caught|caught|catching) (?:on|up)`,
`(?:check|checks|checked|checking) (?:back|by|for|in|into|off|on|out|up)`,
`(?:chicken|chickens|chickened|chickening) out`,
`(?:chop|chops|chopped|chopping) up`,
`(?:clean|cleans|cleaned|cleaning) out`,
`(?:clear|clears|cleared|clearing)${extra} (?:out|up)`,
`(?:clearing|clog|clogs|clogged|clogging) up`,
`(?:close|closes|closed|closing) down`,
`(?:close|closes|closed|closing) off`,
`(?:come|comes|came|coming) (?:about|across|along|apart|around|back|before|by|down with|forward|off|on|out|over|through|up|up against|up with|upon|upon with)`,
`(?:con|cones|conned|conning) into`,
`(?:con|cones|conned|conning) out`,
`(?:cool|cools|cooled|cooling) off`,
`(?:count|counts|counted|counting) up`,
`(?:crack|cracks|cracked|cracking) down`,
`(?:cover|covers|covered|covering) up`,
`(?:cross|crosses|crossed|crossing) off`,
`(?:cry|cries|cried|crying) out`,
`(?:cut|cuts|cutting)${extra} (?:back|down|off|out|up)`,
`(?:do|does|done|did|doing) away`,
`(?:do|does|done|did|doing) over`,
`(?:do|does|done|did|doing) without`,
`(?:doze|dozes|dozed|dozing) off`,
`(?:dress|dresses|dressed|dressing) up`,
`(?:drop|drops|dropped|dropping) (?:in|out|off)`,
`(?:dropping|dry|dries|dried|drying) off`,
`(?:dry|dries|dried|drying) out`,
`(?:dry|dries|dried|drying) up`,
`(?:eat|eats|eaten|eating) up`,
`(?:end|ends|ended|ending) up`,
`(?:empty|empties|emptied|emptying) out`,
`(?:fade|fades|faded|fading) (?:away|in|out)`,
`(?:fall|falls|fell|fallen|falling) (?!from|on|under|behind|between)${phrasalPrepositions}`,
`(?:fasten|fastens|fastened|fastening) up`,
`(?:feel|feels|felt|feeling) up`,
`(?:fight|fights|fought|fighting) back`,
`(?:figure|figures|figured|figuring) out`,
`(?:fill|fills|filled|filling) (?:in|out|up)`,
`(?:find|finds|found|finding) out`,
`(?:fix|fixes|fixed|fixing) up`,
`(?:flip|flips|flipped|flipping) out`,
`(?:float|floats|floated|floating) around`,
`(?:follow|follows|followed|following) up`,
`(?:fool|fools|fooled|fooling) around`,
`(?:freak|freaks|freaked|freaking) out`,
`(?:get|gets|got|getting) (?!together|from|on)${phrasalPrepositions}`,
`(?:give|gives|gave|given|giving)${extra} (?:away|back|in|off|out|up)`,
`(?:go|goes|went|gone|going) (?:away|around|back|back on|down|for|in for|into|off|on|on with|out|over|through|through with|without|up)`,
`(?:goof|goofs|goofed|goofing) around`,
`(?:gross|grosses|grossed|grossing) out`,
`(?:grossing|grow|grows|grew|growing) out`,
`(?:grow|grows|grew|grown|growing) up`,
`(?:hand|hands|handed|handing)${extra} (?:back|out|over)`,
`(?:hang|hangs|hanged|hanging) (?:around|on|out|up)`,
`(?:head|heads|headed|heading) (?:back|for|toward)`,
`(?:head|heads|headed|heading) (?:for|toward)`,
`(?:hear|hears|heard|hearing) (?:about|of)`,
`(?:heat|heats|heated|heating) up`,
`(?:help|helps|helped|helping) out`,
`(?:hit|hits|hitting) on`,
`(?:hold|holds|held|holding)${extra} (?:against|off|on|out|up)`,
`(?:hook|hooks|hooked|hooking)${extra} up`,
`(?:hurry|hurries|hurried|hurrying) up`,
`(?:iron|irons|ironed|ironing)${extra} out`,
`(?:keep|keeps|kept|keeping)${extra} ${phrasalPrepositions}`,
`(?:kick|kicks|kicked|kicking)${extra} (?:back|out|off|up)`,
`(?:knock|knocks|knocked|knocking)${extra} (?:off|out|over)`,
`(?:know|knows|knew|knowing) about`,
`(?:lay|lays|laid|laying) (?:down|off|out)`,
`(?:lead|leads|led|leading) up`,
`(?:leave|leaves|left|leaving)${extra} (?:behind|off|out|over)`,
`(?:let|lets|letting)${extra} down`,
`(?:let|lets|letting)${extra} (?:in|off|on|out|up)`,
`(?:lift|lifts|lifted|lit|lifting)${extra} up`,
`(?:line|lines|lined|lining) up`,
`(?:lock|locks|locked|locking) (?:in|out|up)`,
`(?:look|looks|looked|looking) (?!after)${phrasalPrepositions}`,
`(?:luck|lucks|lucked|lucking) out`,
`(?:match|matches|matched|matching) (?:up|with)`,
`(?:make|makes|made|making) (?:for|off|off with|out|up|up for)`,
`(?:make|makes|made|making)${extra} (?:into|out|out to be)`,
`(?:meet|meets|met|meeting) up`,
`(?:mess|messes|messed|messing) up`,
`(?:mess|messes|messed|messing) around`,
`(?:miss|misses|missed|missing) out`,
`(?:mix|mixes|mixed|mixing) up`,
`(?:monkey|monkeys|monkeyed|monkeying) around`,
`(?:move|moves|moved|moving) (?:out|away)`,
`(?:narrow|narrows|narrowed|narrowing) down`,
`(?:open|opens|opened|opening) up`,
`(?:pay|pays|payed|paying) (?:back|for|off|up)`,
`(?:pick|picks|picked|picking) (?:on|out)`,
`(?:pile|piles|piled|pilling) up`,
`(?:piss|pisses|pissed|pissing) off`,
`(?:phase|phase|phased|phasing) out`,
`(?:plan|plans|planed|planning) (?:ahead|for|on)`,
`(?:play|plays|played|playing) out`,
`(?:plug|plugs|plugged|plugging) in`,
`(?:plug|plugs|plugged|plugging) into`,
`(?:plug|plugs|plugged|plugging) out`,
`(?:point|points|pointed|pointing)${extra} (?:out|to)`,
`(?:print|prints|printed|printing) out`,
`(?:pull|pulls|pulled|pulling)${extra} (?:away|off|up|back|over|out)`,
`(?:put|puts|putting)${extra} (?:aside|down|on|off|out|past|to|together)`,
`(?:revolve|revolves|revolved|revolving) around`,
`(?:reach|reaches|reached|reaching) out`,
`(?:ring|rings|ringed|ringing) up`,
`(?:rip|rips|ripped|ripping) off`,
`(?:rip|rips|ripped|ripping) up`,
`(?:rule|rules|ruled|ruling) out`,
`(?:run|runs|ran|running) (?:across|away|down|over|up)`,
`(?:screw|screws|screwed|screwing) (?:on|out|up)`,
`(?:see|sees|seen|saw|seeing) about`,
`(?:seek|seeks|sought|seeking) out`,
`(?:sell|sells|sold|selling) out`,
`(?:set|sets|setting) aside`,
`(?:set|sets|setting) up`,
`(?:settle|settles|settled|settling) down`,
`(?:settle|settles|settled|setting) for`,
`(?:shake|shakes|shaken|shacking) up`,
`(?:show|shows|showed|showing) (?:up|off)`,
`(?:shun|shuns|shunned|shunning) away`,
`(?:shut|shuts|shutting) (?:off|down|up)`,
`(?:shy|shies|shied|shying) away`,
`(?:sign|signs|signed|signing) (?:in|out)`,
`(?:sit|sits|sat|sitting) down`,
`(?:slow|slows|slowed|slowing) down`,
`(?:sneak|sneaks|sneaked|sneaking) (?:in|out)`,
`(?:sort|sorts|sorted|sorting) out`,
`(?:space|spaces|spaced|spacing) out`,
`(?:speak|speaks|spoke|speaking)${extra} (?:up|back|for|about)`,
`(?:speed|speeds|speeded|speeding) up`,
`(?:spread|spreads|speeding) out`,
`(?:stall|stalls|stalled|stalling) out`,
`(?:stand|stands|stood|standing) (?:around|for|up|out)`,
`(?:start|starts|started|starting)${extra} (?:off|out|up|over)`,
`(?:stay|stays|stayed|staying) (?:off|out|up)`,
`(?:step|steps|stepped|stepping) on`,
`(?:step|steps|stepped|stepping) back`,
`(?:stick|sticks|sticked|sticking) (?:around|out|to|up|with)`,
`(?:stop|stops|stopped|stopping) (?:off|out|over)`,
`(?:stray|strays|strayed|straying) away( from)?`,
`(?:straighten|straightens|straightened|straightening) out`,
`(?:switch|switches|switched|switching) (?:off|out|on)`,
`(?:sum|sums|summed|summing) up`,
`(?:take|takes|took|taken|taking)${extra} (?:after|away|back|down|apart|for|in|off|on|over|out|through|to|up)`,
`(?:talk|talks|talked|talking)${extra} (?:down|out|into)`,
`(?:tear|tears|teared|tearing)${extra} (?:down|off|apart)`,
`(?:tell|tells|told|telling) on`,
`(?:think|thinks|thought|thinking)${extra} (?:over|ahead|up)`,
`(?:throw|throws|threw|throwing)${extra} (?:away|out|up)`,
`(?:track|tracks|tracked|tracking)${extra} down`,
`(?:trade|trades|traded|trading) in`,
`(?:trick|tricks|tricked|trucking) into`,
`(?:try|tries|tried|trying) on`,
`(?:try|tries|tried|trying)${extra} out`,
`(?:turn|turns|turned|turning)${extra} (?:around|in|into|off|on|out|over|up)`,
`(?:wipe|wipes|wiped|wiping) up`,
`(?:use|uses|used|using) up`,
`(?:wash|washes|washed|washing) (?:off|away)( with)?`,
`(?:wake|wakes|waked|waking) up`,
`(?:walk|walks|walked|walking) (?:away|through)`,
`(?:wash|washes|washed|washing) away`,
`(?:wash|washes|washed|washing) up`,
`(?:watch|watches|watched|watching) out`,
`(?:wear|wears|wore|wearing) down`,
`(?:zip|zips|zipped|zipping) up`,
`(?:wipe|wipes|wiped|wiping) out`,
`(?:weigh|weighs|weighed|weighing) in`,
`(?:wear|wears|wore|wearing) (?:off|out)`,
`(?:wind|winds|winded|winding) up`,
`(?:wipe|wipes|wiped|wiping) off`,
`(?:work|works|worked|working) (?:up|out)`,
]





export default phrasalVerbs;