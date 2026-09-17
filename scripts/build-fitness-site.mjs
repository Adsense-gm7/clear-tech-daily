import { mkdir, writeFile } from "node:fs/promises";
import { extraArticles } from "./extra-articles.mjs";

const root = new URL("../", import.meta.url);
const base = "https://clear-tech-daily.vercel.app";
const ads = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1967880499909178" crossorigin="anonymous"></script>';

const articles = [
  {
    slug: "beginner-full-body-workout",
    title: "A Beginner Full-Body Workout You Can Repeat Every Week",
    category: "Beginner Training",
    time: "9 min read",
    description: "A practical three-day strength routine with exercise order, sets, reps, rest periods, and simple progression rules.",
    intro: "Starting strength training does not require a complicated split or a long list of exercises. This three-day routine trains the major movement patterns, leaves recovery time between sessions, and gives you one clear way to progress.",
    sections: [
      ["Who this plan is for", `<p>This plan is designed for generally healthy adults who are new to resistance training or returning after a long break. Train on three nonconsecutive days, such as Monday, Wednesday, and Friday. If you have an injury, are pregnant, or have a medical condition that affects exercise, ask a qualified health professional for individualized guidance.</p>`],
      ["The workout", `<ol><li><strong>Goblet squat:</strong> 2–3 sets of 8–12 reps.</li><li><strong>Dumbbell bench press:</strong> 2–3 sets of 8–12 reps.</li><li><strong>One-arm dumbbell row:</strong> 2–3 sets of 8–12 reps per side.</li><li><strong>Romanian deadlift:</strong> 2 sets of 8–10 reps.</li><li><strong>Half-kneeling overhead press:</strong> 2 sets of 8–10 reps per side.</li><li><strong>Front plank:</strong> 2 sets of 20–40 seconds.</li></ol><p>Rest 90–150 seconds after demanding compound exercises and 60–90 seconds after the plank. Longer rest is appropriate when breathing or technique has not recovered.</p>`],
      ["How hard should each set feel?", `<p>Finish most sets with approximately two or three good repetitions still available. The final repetitions should require focus without changing the exercise path, shortening the range of motion, or holding your breath uncontrollably. Training to failure is unnecessary for this beginner plan.</p>`],
      ["A simple progression rule", `<p>Choose a load that lets you reach the lower end of the repetition range with steady technique. When you complete the top of the range on every set for two workouts, increase the load by the smallest available amount. If technique deteriorates, keep the same load or reduce it.</p>`],
      ["What to record", `<p>Write down the exercise, load, completed repetitions, and one brief technique note. This small log is more useful than changing the routine every week because it shows whether your capacity is actually improving.</p>`]
    ]
  },
  {
    slug: "bodyweight-workout-at-home",
    title: "A No-Equipment Home Workout for the Whole Body",
    category: "Home Workouts",
    time: "8 min read",
    description: "A scalable home workout using squats, push-ups, hinges, split squats, and core work—with easier and harder options.",
    intro: "A useful home workout should be easy to start and easy to adjust. This session uses five movements and clear progressions, so you can train without pretending that every bodyweight variation fits every person.",
    sections: [
      ["Warm up for the movements", `<p>Spend five minutes walking in place, circling the shoulders, and performing slow practice repetitions. The purpose is to rehearse the positions you will use—not to exhaust yourself before the working sets.</p>`],
      ["The five-movement session", `<ol><li><strong>Chair squat:</strong> 3 sets of 10–15.</li><li><strong>Incline push-up:</strong> 3 sets of 6–12.</li><li><strong>Hip hinge or glute bridge:</strong> 3 sets of 10–15.</li><li><strong>Supported split squat:</strong> 2 sets of 6–10 per side.</li><li><strong>Dead bug:</strong> 2 sets of 6–10 controlled reps per side.</li></ol><p>Rest 60–120 seconds between sets. Use a stable chair or countertop; do not use furniture that can slide or tip.</p>`],
      ["Make it easier", `<p>Reduce the range of motion, use hand support, choose a higher surface for push-ups, or complete fewer repetitions. An easier variation performed with control is more productive than a difficult variation performed with repeated loss of balance.</p>`],
      ["Make it harder", `<p>Add a pause at the hardest point, slow the lowering phase to three seconds, increase the range of motion, or add repetitions within the listed range. Change only one variable at a time so you can judge its effect.</p>`],
      ["Stop signals", `<p>End the set if you feel sharp pain, sudden dizziness, chest pressure, or unusual shortness of breath. Normal muscular effort and a rising heart rate are different from symptoms that feel sudden, severe, or unfamiliar.</p>`]
    ]
  },
  {
    slug: "how-to-squat",
    title: "How to Squat: A Practical Technique Guide",
    category: "Exercise Technique",
    time: "8 min read",
    description: "Learn a stable squat setup, comfortable depth, common corrections, and safe ways to practice the movement.",
    intro: "There is no single squat stance that fits every body. A good squat is one you can repeat with balance, controlled joints, and a range of motion appropriate for your current mobility and goals.",
    sections: [
      ["Build your stance", `<p>Start with feet approximately shoulder-width apart and toes turned slightly outward. Keep the entire foot in contact with the floor: heel, base of the big toe, and base of the little toe. Adjust the stance by small amounts until the hips can travel comfortably between the thighs.</p>`],
      ["Descend with control", `<p>Brace your trunk as if preparing for a light bump, then bend the knees and hips together. Let the knees follow the direction of the toes. Keep pressure distributed across the foot rather than rolling onto the inner edge.</p>`],
      ["Choose useful depth", `<p>Descend only as far as you can maintain balance and control. Depth may improve with practice, but it should not be forced. A box or bench provides a consistent target while you learn.</p>`],
      ["Stand up", `<p>Push the floor away and allow the hips and shoulders to rise together. Exhale through the hardest portion without losing trunk position. At the top, stand tall rather than leaning backward.</p>`],
      ["Common problems", `<ul><li><strong>Heels lift:</strong> try a slightly wider stance or reduce depth.</li><li><strong>Knees collapse inward:</strong> lower the load and track the knees with the toes.</li><li><strong>Balance shifts forward:</strong> practice to a box and slow the descent.</li><li><strong>Back position changes suddenly:</strong> stop before that point and rebuild control.</li></ul>`]
    ]
  },
  {
    slug: "push-up-progression",
    title: "Push-Up Progressions: From Wall to Floor",
    category: "Exercise Technique",
    time: "7 min read",
    description: "Find the right push-up level and progress it without sacrificing shoulder comfort or trunk position.",
    intro: "The push-up is a moving plank as much as it is a chest exercise. Using an elevated surface is not a shortcut; it is a measurable way to build the strength required for lower variations.",
    sections: [
      ["Set the position", `<p>Place hands slightly wider than shoulder width. Spread the fingers, keep the wrists under or just behind the shoulders, and create a straight line from the head through the hips. Let the shoulder blades move naturally rather than pinching them together throughout the repetition.</p>`],
      ["Select your starting level", `<p>Begin at a wall, sturdy countertop, bench, or floor. Choose the height that allows 6–12 smooth repetitions while keeping the ribs and pelvis controlled. A higher surface reduces the percentage of body weight you press.</p>`],
      ["Perform each repetition", `<p>Lower the chest toward the surface while the elbows travel at a comfortable diagonal—not directly sideways. Stop before the shoulders roll forward or the hips sag, then press the surface away until the elbows are straight without forcefully locking them.</p>`],
      ["Progress without guessing", `<p>Complete three sets twice per week. Once you can perform 12 controlled repetitions in all sets for two sessions, use a slightly lower surface. Keep the previous level available for lighter days.</p>`],
      ["Shoulder-friendly adjustments", `<p>Try a slightly narrower hand position, a higher surface, or a neutral grip on stable handles. Pain that persists or worsens is a reason to stop and seek an assessment rather than repeatedly testing the same painful variation.</p>`]
    ]
  },
  {
    slug: "romanian-deadlift-guide",
    title: "Romanian Deadlift: Learn the Hip Hinge",
    category: "Exercise Technique",
    time: "8 min read",
    description: "A step-by-step Romanian deadlift guide focused on hip movement, load control, and hamstring training.",
    intro: "The Romanian deadlift trains the hamstrings, glutes, and back isometrically while teaching the hip hinge. The goal is not to lower the weight to the floor; it is to move through the largest controlled range your hips allow.",
    sections: [
      ["Start from the top", `<p>Stand tall with the load close to the thighs, feet about hip-width apart, and knees softly bent. Create gentle abdominal pressure and keep the head aligned with the torso.</p>`],
      ["Send the hips backward", `<p>Push the hips behind you while keeping the shins nearly vertical. The weight should travel close to the legs. Continue until you feel strong hamstring tension or can no longer move the hips back without changing spinal position.</p>`],
      ["Return to standing", `<p>Drive the feet into the floor and bring the hips forward. Finish tall with the ribs stacked over the pelvis. Avoid leaning back or aggressively squeezing beyond a neutral standing position.</p>`],
      ["Loading and repetitions", `<p>Beginners can practice with a dowel, light dumbbells, or kettlebell for 2–3 sets of 8–12 repetitions. Add load only when the hinge remains repeatable and the weight stays close to the body.</p>`],
      ["Frequent errors", `<ul><li>Turning the movement into a squat by pushing the knees far forward.</li><li>Reaching toward the floor instead of moving the hips backward.</li><li>Letting the load drift away from the legs.</li><li>Using speed to bounce out of the bottom position.</li></ul>`]
    ]
  },
  {
    slug: "dumbbell-row-guide",
    title: "How to Do a One-Arm Dumbbell Row",
    category: "Exercise Technique",
    time: "7 min read",
    description: "Set up a stable one-arm dumbbell row and train your upper back without turning every rep into a torso twist.",
    intro: "A good row combines a stable torso with controlled movement of the shoulder blade and arm. The exercise does not need an exaggerated range or a heavy dumbbell to be effective.",
    sections: [
      ["Create a stable base", `<p>Place one hand on a sturdy bench and stagger the feet, or use a square stance with one hand supported. Hinge until the torso is comfortable and keep the working shoulder away from the ear.</p>`],
      ["Row toward the hip", `<p>Pull the elbow toward the back pocket while keeping the forearm under the wrist. Allow the shoulder blade to move around the rib cage at the bottom, then guide it back without shrugging.</p>`],
      ["Control the lowering phase", `<p>Lower the dumbbell until the arm is long and the shoulder remains controlled. Avoid dropping the weight or reaching so far that the torso rotates toward the floor.</p>`],
      ["Programming", `<p>Use 2–4 sets of 8–15 repetitions per side. Begin with the weaker or less coordinated side, match the repetitions with the other arm, and rest long enough to keep the grip and torso stable.</p>`],
      ["What you should feel", `<p>You may feel the muscles around the shoulder blade, the side of the upper back, the rear shoulder, and the arm working. Location varies. Sharp pain in the shoulder or back is not a target sensation.</p>`]
    ]
  },
  {
    slug: "strength-training-rest-times",
    title: "How Long Should You Rest Between Sets?",
    category: "Training Basics",
    time: "6 min read",
    description: "Choose rest periods based on the exercise, training goal, and quality of your next set—not an arbitrary countdown.",
    intro: "Rest is part of the workout, not time wasted. The right interval is long enough for you to repeat the intended effort with safe technique and short enough to keep the session practical.",
    sections: [
      ["A useful starting point", `<ul><li><strong>Heavy compound exercises:</strong> 2–4 minutes.</li><li><strong>Moderate hypertrophy sets:</strong> 90–180 seconds.</li><li><strong>Smaller isolation exercises:</strong> 60–120 seconds.</li><li><strong>Circuits for general conditioning:</strong> 30–90 seconds, provided technique remains stable.</li></ul>`],
      ["Let the next set decide", `<p>If repetitions drop sharply, breathing remains uncontrolled, or technique changes immediately, rest longer. If you feel fully ready well before the timer ends, beginning a little earlier may be reasonable for a light accessory exercise.</p>`],
      ["Strength and muscle gain", `<p>Longer rest often supports better performance on demanding sets because you can preserve load and repetitions. Short rest can make a set feel harder, but feeling harder does not automatically make it more productive.</p>`],
      ["Time-saving options", `<p>Pair exercises that do not compete heavily, such as a dumbbell press with a row. Rest briefly between movements, then take a longer break after the pair. Avoid rushing two technically demanding lifts simply to finish sooner.</p>`],
      ["Track what works", `<p>Record the rest range along with load and repetitions. Consistent conditions make progress easier to interpret than changing rest periods randomly from session to session.</p>`]
    ]
  },
  {
    slug: "progressive-overload-explained",
    title: "Progressive Overload Without Chasing Heavier Weight",
    category: "Training Basics",
    time: "7 min read",
    description: "Understand progressive overload through reps, load, range of motion, control, and training consistency.",
    intro: "Progressive overload means gradually asking the body to do more over time. Adding weight is one method, but it is not the only one—and it is often not the first change a beginner needs.",
    sections: [
      ["Five ways to progress", `<ol><li>Perform more repetitions with the same load.</li><li>Add a small amount of weight.</li><li>Add a set when recovery permits.</li><li>Use a larger controlled range of motion.</li><li>Improve technique or reduce unnecessary assistance.</li></ol>`],
      ["Use a repetition range", `<p>For an exercise programmed at 8–12 repetitions, keep the same load until you can reach 12 on every set with the intended technique. Then increase the load slightly and expect repetitions to return toward eight.</p>`],
      ["Do not progress everything at once", `<p>Adding weight, sets, frequency, and advanced variations simultaneously makes fatigue difficult to manage. Change one variable, observe it for several sessions, and keep the change only if performance and recovery remain acceptable.</p>`],
      ["Plateaus are information", `<p>A stalled exercise may reflect sleep, stress, inconsistent technique, insufficient rest, or an unrealistic jump in load. Review these variables before replacing the entire routine.</p>`],
      ["When maintaining is success", `<p>During stressful weeks, illness recovery, or a calorie deficit, maintaining strength can be meaningful progress. Training decisions should reflect the whole context rather than a demand to set records every session.</p>`]
    ]
  },
  {
    slug: "warm-up-before-strength-training",
    title: "How to Warm Up Before Strength Training",
    category: "Training Basics",
    time: "7 min read",
    description: "Build an efficient warm-up with general movement, exercise-specific practice, and gradual loading.",
    intro: "A warm-up should prepare you for the session without becoming a separate workout. Most lifters need a short period of general movement followed by practice sets of the exercises they are about to perform.",
    sections: [
      ["Start with general movement", `<p>Use three to five minutes of walking, easy cycling, or another comfortable activity. The goal is to feel warmer and more alert, not tired.</p>`],
      ["Address a specific limitation", `<p>If a joint or movement feels stiff, add one or two drills that directly relate to the upcoming exercise. Avoid a long collection of stretches with no clear purpose.</p>`],
      ["Perform ramp-up sets", `<p>For the first compound lift, complete several lighter sets while gradually approaching the working load. As the load rises, lower the repetitions so the warm-up does not create unnecessary fatigue.</p>`],
      ["Example before squats", `<p>After general movement, perform bodyweight squats, then an empty-bar or light goblet set, followed by two or three progressively heavier sets. A beginner using light dumbbells may need fewer steps than an experienced lifter using a heavy barbell.</p>`],
      ["Avoid these mistakes", `<ul><li>Turning every warm-up into intense conditioning.</li><li>Holding long static stretches immediately before maximal strength attempts.</li><li>Making large jumps to the working weight.</li><li>Ignoring pain that grows as the warm-up continues.</li></ul>`]
    ]
  },
  {
    slug: "exercise-form-and-pain",
    title: "Exercise Form, Discomfort, and When to Stop",
    category: "Safety",
    time: "8 min read",
    description: "A cautious framework for separating normal training effort from symptoms that deserve a pause or professional evaluation.",
    intro: "Exercise can create muscular effort, fatigue, and temporary soreness. It should not require you to ignore alarming symptoms. This guide offers general safety boundaries, not diagnosis or treatment.",
    sections: [
      ["Normal effort is not perfectly comfortable", `<p>Working muscles may burn, breathing may increase, and the final repetitions may move more slowly. Delayed muscle soreness can also occur after unfamiliar training. These experiences should remain manageable and improve with recovery.</p>`],
      ["Stop the exercise", `<p>Stop if you experience sharp or rapidly increasing pain, chest pressure, faintness, sudden severe shortness of breath, loss of coordination, or a sensation that feels distinctly wrong. Seek urgent medical help for severe or emergency symptoms.</p>`],
      ["Modify before you abandon movement", `<p>For mild discomfort, a qualified professional may help you explore a lighter load, smaller range, different grip, slower tempo, or alternate exercise. Repeatedly forcing the same painful motion is not a test of discipline.</p>`],
      ["Technique is individual within boundaries", `<p>People have different limb lengths, mobility, training histories, and goals. Good form is not a single frozen shape, but it should provide control, balance, and a repeatable path suited to the task.</p>`],
      ["Use qualified help", `<p>A certified fitness professional can coach exercise execution; a licensed health professional should evaluate persistent or concerning symptoms. Online information cannot examine you or account for your complete medical history.</p>`]
    ]
  },
  {
    slug: "weekly-workout-schedule",
    title: "How to Build a Realistic Weekly Workout Schedule",
    category: "Program Design",
    time: "8 min read",
    description: "Choose a training frequency you can recover from and maintain, with sample two-, three-, and four-day schedules.",
    intro: "The best weekly plan is not the one with the most training days. It is the one that covers your priorities, fits your calendar, and leaves enough recovery for the next useful session.",
    sections: [
      ["Start with availability", `<p>Count the days you can protect most weeks, not during an ideal week. Two consistent full-body sessions can outperform a five-day plan that is repeatedly skipped.</p>`],
      ["Two-day option", `<p>Train the full body on Tuesday and Saturday. Include one squat or lunge, one hinge, one press, one pull, and one trunk exercise in each session. This schedule leaves generous recovery and works well for busy beginners.</p>`],
      ["Three-day option", `<p>Use full-body sessions on Monday, Wednesday, and Friday, or alternate two workouts across three days. Keep the number of hard sets modest so repeated muscle groups recover between sessions.</p>`],
      ["Four-day option", `<p>An upper/lower split can use Monday and Thursday for upper body, Tuesday and Friday for lower body. This arrangement distributes volume without requiring long daily sessions.</p>`],
      ["Plan for interruptions", `<p>When you miss a day, continue with the next planned session rather than doubling the workload. A schedule that handles travel, poor sleep, and busy periods is more durable than one that depends on perfect conditions.</p>`]
    ]
  },
  {
    slug: "cooldown-after-workout",
    title: "Do You Need a Cooldown After Your Workout?",
    category: "Recovery",
    time: "6 min read",
    description: "What a cooldown can and cannot do, plus a simple five-minute routine for transitioning out of training.",
    intro: "A cooldown can help you transition gradually from hard effort to rest, but it is not a detox and it does not guarantee that soreness will disappear. Keep it simple and use it when it helps you feel settled.",
    sections: [
      ["Lower the intensity gradually", `<p>After demanding conditioning, walk or pedal easily for three to five minutes until breathing feels comfortable. After a moderate strength session, putting away equipment and walking briefly may provide the same transition.</p>`],
      ["Stretching is optional", `<p>Gentle stretching can feel pleasant and may support flexibility when practiced consistently. It does not need to be forced, and pain is not evidence that a stretch is more effective.</p>`],
      ["A five-minute example", `<ol><li>Two minutes of easy walking.</li><li>Thirty seconds per side of a comfortable hip-flexor stretch.</li><li>Thirty seconds per side of a chest or shoulder stretch.</li><li>One minute of slow, relaxed breathing.</li></ol>`],
      ["What matters more for recovery", `<p>Sleep, appropriate training volume, regular meals, hydration, and rest between demanding sessions generally matter more than an elaborate post-workout ritual.</p>`],
      ["After unusual symptoms", `<p>A cooldown is not treatment for chest pain, faintness, severe shortness of breath, or injury. Stop exercising and obtain appropriate medical assistance when symptoms are concerning.</p>`]
    ]
  }
];

articles.push(...extraArticles);

const nav = `<header class="site-header"><a class="brand" href="/" aria-label="Form First home"><span class="brand-mark" aria-hidden="true">FF</span><span>Form First</span></a><button class="menu" type="button" aria-expanded="false" aria-controls="primary-nav">Menu</button><nav id="primary-nav" aria-label="Primary navigation"><a href="/">Home</a><a href="/articles/">Exercise Guides</a><a href="/about">About</a><a href="/contact">Contact</a></nav></header>`;
const footer = `<footer><div><a class="brand" href="/"><span class="brand-mark" aria-hidden="true">FF</span><span>Form First</span></a><p>Clear, practical exercise education for everyday adults.</p></div><nav aria-label="Footer navigation"><a href="/about">About</a><a href="/author">Author</a><a href="/editorial-policy">Editorial Policy</a><a href="/medical-disclaimer">Medical Disclaimer</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></nav><p>© <span id="year">2026</span> Form First.</p></footer>`;

function shell({ title, description, canonical, body, schema = "" }) {
  return `<!doctype html><html lang="en-US"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${canonical}"><link rel="stylesheet" href="/assets/style.css">${ads}${schema}<link rel="icon" href="/assets/logo.svg" type="image/svg+xml"></head><body><a class="skip" href="#content">Skip to content</a>${nav}${body}${footer}<script src="/assets/site.js" defer></script></body></html>`;
}

function articlePage(a) {
  const sections = a.sections.map(([h, html], i) => `<section><h2 id="section-${i + 1}">${h}</h2>${html}</section>`).join("");
  const toc = a.sections.map(([h], i) => `<a href="#section-${i + 1}">${h}</a>`).join("");
  const schema = `<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"Article",headline:a.title,description:a.description,datePublished:"2026-09-17",dateModified:"2026-09-17",author:{"@type":"Organization",name:"Form First Editorial Team",url:`${base}/author`},publisher:{"@type":"Organization",name:"Form First"},mainEntityOfPage:`${base}/articles/${a.slug}`})}</script>`;
  return shell({title:`${a.title} | Form First`,description:a.description,canonical:`${base}/articles/${a.slug}`,schema,body:`<main id="content" class="article-wrap"><article class="article"><p class="eyebrow">${a.category}</p><h1>${a.title}</h1><p class="meta">By <a href="/author">Form First Editorial Team</a> · Reviewed September 17, 2026 · ${a.time}</p><p class="lede">${a.intro}</p><div class="safety-note"><strong>Safety note:</strong> This article provides general exercise education, not medical advice. Stop if you experience sharp pain, dizziness, chest pressure, or unusual shortness of breath.</div>${sections}<section class="sources"><h2>Editorial basis and sources</h2><p>This guide applies established resistance-training principles and conservative exercise coaching practices. General activity context is informed by the U.S. Department of Health and Human Services’ <a href="https://health.gov/our-work/nutrition-physical-activity/physical-activity-guidelines">Physical Activity Guidelines for Americans</a> and the CDC’s <a href="https://www.cdc.gov/physical-activity/php/about/index.html">physical activity guidance</a>. See our <a href="/editorial-policy">editorial policy</a> for how we research, write, review, and update content.</p></section></article><aside class="toc" aria-label="On this page"><strong>On this page</strong>${toc}<a href="/articles/">All exercise guides</a></aside></main>`});
}

const cards = articles.map(a => `<article class="card"><p class="tag">${a.category} · ${a.time}</p><h2><a href="/articles/${a.slug}">${a.title}</a></h2><p>${a.description}</p><a class="text-link" href="/articles/${a.slug}">Read guide <span aria-hidden="true">→</span></a></article>`).join("");
const featured = articles.slice(0,6).map(a => `<article class="card"><p class="tag">${a.category} · ${a.time}</p><h3><a href="/articles/${a.slug}">${a.title}</a></h3><p>${a.description}</p><a class="text-link" href="/articles/${a.slug}">Read guide <span aria-hidden="true">→</span></a></article>`).join("");

const pages = {
  "index.html": shell({title:"Form First | Practical Exercise Guides",description:"Evidence-aware, beginner-friendly exercise guides with clear technique cues, scalable workouts, and responsible safety guidance.",canonical:`${base}/`,body:`<main id="content"><section class="hero"><div><p class="eyebrow">Train with clarity</p><h1>Better workouts start with better instructions.</h1><p>Practical, beginner-friendly exercise guides built around sound technique, realistic progression, and your ability to train consistently.</p><div class="hero-actions"><a class="button" href="/articles/">Explore exercise guides</a><a class="secondary-button" href="/articles/beginner-full-body-workout">Start with the beginner plan</a></div></div><div class="hero-visual" aria-label="Illustration of balanced strength training"><svg viewBox="0 0 520 420" role="img"><title>Balanced dumbbell illustration</title><circle cx="260" cy="210" r="178" fill="#dff3e8"/><path d="M145 188v44m230-44v44M115 174v72m290-72v72M145 210h230" stroke="#13271f" stroke-width="22" stroke-linecap="round"/><circle cx="260" cy="210" r="52" fill="#ff6b35"/><path d="M238 210h44M260 188v44" stroke="#fff" stroke-width="9" stroke-linecap="round"/></svg></div></section><section class="trust-strip" aria-label="Our approach"><div><strong>Clear</strong><span>Plain-language coaching cues</span></div><div><strong>Scalable</strong><span>Options for different ability levels</span></div><div><strong>Responsible</strong><span>No miracle claims or unsafe shortcuts</span></div></section><section class="section"><div class="section-heading"><div><p class="eyebrow">Featured guides</p><h2>Build a strong foundation</h2></div><p>Start with repeatable movements, learn how effort should feel, and progress one variable at a time.</p></div><div class="cards">${featured}</div></section><section class="promise"><div><p class="eyebrow">Our editorial promise</p><h2>Useful before profitable.</h2></div><div><p>We publish original exercise education for readers—not mass-produced pages for search engines. We separate general fitness education from medical advice and correct material when credible evidence or safety guidance changes.</p><a class="text-link" href="/editorial-policy">Read our editorial standards →</a></div></section></main>`}),
  "articles/index.html": shell({title:"Exercise Guides | Form First",description:"Browse practical guides for strength training, home workouts, exercise technique, program design, safety, and recovery.",canonical:`${base}/articles/`,body:`<main id="content" class="page wide"><p class="eyebrow">Exercise library</p><h1>Guides you can use in your next workout.</h1><p class="lede">Every guide is designed around a specific training question, with concrete steps and clear safety boundaries.</p><div class="cards article-grid">${cards}</div></main>`}),
  "about.html": shell({title:"About Form First",description:"Learn why Form First publishes practical, responsible exercise education for adults in the United States.",canonical:`${base}/about`,body:`<main id="content" class="page"><p class="eyebrow">About us</p><h1>Exercise guidance without hype.</h1><p class="lede">Form First is an independent educational website for adults who want clearer workout instructions and more realistic training plans.</p><h2>Our purpose</h2><p>Fitness information often creates urgency where patience would be more useful. We focus on exercise setup, progression, recovery, and decision-making so readers can understand the reason behind a recommendation.</p><h2>What we publish</h2><p>Our core topics are resistance training, bodyweight exercise, movement technique, workout planning, and general recovery habits. We do not publish individualized medical treatment, steroid protocols, guaranteed transformations, or fear-based health claims.</p><h2>How we earn revenue</h2><p>The site may display advertising. Advertising relationships do not determine our conclusions or permit advertisers to review articles before publication. Sponsored material, if introduced, will be clearly labeled.</p><h2>Important limitation</h2><p>Our content is educational and cannot replace an assessment by a licensed healthcare professional or individualized coaching from a qualified professional who can observe you directly.</p></main>`}),
  "author.html": shell({title:"Editorial Team | Form First",description:"Learn about the editorial process behind Form First exercise guides.",canonical:`${base}/author`,body:`<main id="content" class="page"><p class="eyebrow">Publisher</p><h1>Form First Editorial Team</h1><p class="lede">We create exercise guides focused on practical instruction, cautious language, and clear limits.</p><h2>About the byline</h2><p>Form First currently publishes under a team byline rather than claiming credentials we have not independently documented. Our work translates established training principles into steps a general adult reader can understand and apply.</p><h2>Editorial responsibilities</h2><ul><li>Define the reader and purpose of each article before drafting.</li><li>Distinguish coaching suggestions from medical guidance.</li><li>Use conservative language when evidence or individual response varies.</li><li>Review articles for clarity, internal consistency, and unsafe implications.</li><li>Correct substantive errors and update material when guidance changes.</li></ul><h2>Contact</h2><p>Questions, corrections, and source requests can be submitted through our <a href="/contact">contact page</a>.</p></main>`}),
  "editorial-policy.html": shell({title:"Editorial Policy | Form First",description:"How Form First researches, writes, reviews, corrects, and updates exercise content.",canonical:`${base}/editorial-policy`,body:`<main id="content" class="page"><p class="eyebrow">Standards</p><h1>Editorial policy</h1><p class="lede">Our goal is to publish original exercise education that is useful, honest about limitations, and safe for a general audience.</p><h2>How topics are selected</h2><p>We choose focused questions that a reader can act on, such as learning a movement, organizing a training week, or adjusting an exercise. We do not create articles simply to repeat trending claims.</p><h2>Research and drafting</h2><p>Articles are based on established exercise principles, credible public-health guidance where relevant, and practical coaching considerations. Sources are interpreted rather than copied. AI-assisted tools may help with organization or proofreading, but every page is reviewed, edited, and owned by the named author.</p><h2>Health and safety claims</h2><p>We avoid diagnosing conditions, promising outcomes, or presenting a single technique as universally correct. Medical questions are directed to licensed professionals. Emergency symptoms are never treated as ordinary workout discomfort.</p><h2>Advertising independence</h2><p>Advertising does not determine article topics, recommendations, or conclusions. Ads are visually separated from editorial content. We never ask readers to click advertisements.</p><h2>Corrections and updates</h2><p>Substantive corrections are made promptly. Pages show a reviewed date and are updated when instructions, evidence, or safety guidance materially changes. Send correction requests through our <a href="/contact">contact page</a>.</p></main>`}),
  "medical-disclaimer.html": shell({title:"Medical Disclaimer | Form First",description:"Important limitations and safety information for using Form First exercise content.",canonical:`${base}/medical-disclaimer`,body:`<main id="content" class="page"><p class="eyebrow">Please read</p><h1>Medical disclaimer</h1><p>The information on Form First is provided for general educational purposes only. It is not medical advice, diagnosis, treatment, physical therapy, rehabilitation, or a substitute for care from a qualified healthcare professional.</p><h2>Before exercising</h2><p>Consult an appropriate healthcare professional before beginning or changing an exercise program if you have a medical condition, injury, are pregnant, take medication that affects exercise, or have been advised to limit physical activity.</p><h2>Stop and seek help</h2><p>Stop exercising if you experience sharp or severe pain, chest pressure, fainting, sudden severe shortness of breath, loss of coordination, or other alarming symptoms. Call 911 or seek emergency care for a suspected medical emergency.</p><h2>Individual response</h2><p>Exercise carries inherent risk, and results vary. Examples, repetition ranges, and progressions on this site may not be appropriate for every person. Use stable equipment, maintain a safe environment, and choose variations within your current ability.</p></main>`}),
  "contact.html": shell({title:"Contact Form First",description:"Contact Form First with feedback, correction requests, privacy questions, or general inquiries.",canonical:`${base}/contact`,body:`<main id="content" class="page"><p class="eyebrow">Contact</p><h1>Send us a note.</h1><p class="lede">We welcome correction requests, accessibility feedback, source questions, and general inquiries.</p><div class="contact-box"><h2>Contact the publisher</h2><p><a class="button" href="https://github.com/Adsense-gm7">Contact via our public GitHub profile</a></p><p>Please include the page URL and a clear description when reporting an error. Do not send private medical records or use this channel for urgent health questions.</p></div><h2>Response expectations</h2><p>Messages are reviewed for relevance and safety. We cannot provide individual diagnoses, treatment plans, or emergency support.</p></main>`}),
  "privacy.html": shell({title:"Privacy Policy | Form First",description:"Learn how Form First handles analytics, advertising cookies, messages, and privacy choices.",canonical:`${base}/privacy`,body:`<main id="content" class="page"><p class="eyebrow">Legal</p><h1>Privacy policy</h1><p class="meta">Effective September 17, 2026</p><p>This policy explains what information may be collected when you visit Form First and how it may be used.</p><h2>Information you provide</h2><p>If you contact us, we receive the information in your message and public profile. We use it to respond, investigate corrections, and protect the site. Do not send sensitive medical information.</p><h2>Automatic data</h2><p>Hosting, security, analytics, and advertising providers may process IP address, browser and device information, referring pages, approximate location, and interactions needed to operate, secure, measure, or monetize the site.</p><h2>Google advertising and cookies</h2><p>Google and its partners may use cookies or similar technologies to serve and measure ads, limit repeated ads, detect fraud, and—where consent permits—personalize advertising. Learn <a href="https://policies.google.com/technologies/partner-sites">how Google uses information from sites that use its services</a>.</p><h2>Your choices</h2><p>You can manage cookies through browser controls and available consent tools. Visitors in regions requiring consent will be shown applicable choices. You can also review Google’s <a href="https://myadcenter.google.com/">advertising controls</a>.</p><h2>Retention and sharing</h2><p>We retain correspondence only as reasonably needed. Providers may process data on our behalf for hosting, security, analytics, or advertising. We may disclose information when legally required or necessary to protect rights and safety.</p><h2>Children</h2><p>This site is intended for a general adult audience and is not directed to children under 13. We do not knowingly collect personal information from children.</p><h2>Contact</h2><p>Privacy questions may be submitted through our <a href="/contact">contact page</a>.</p></main>`}),
  "terms.html": shell({title:"Terms of Use | Form First",description:"Terms governing use of Form First and its educational exercise content.",canonical:`${base}/terms`,body:`<main id="content" class="page"><p class="eyebrow">Legal</p><h1>Terms of use</h1><p class="meta">Effective September 17, 2026</p><p>By using this site, you agree to these terms. If you do not agree, do not use the site.</p><h2>Educational use</h2><p>Content is general information and does not create a professional-client relationship. You are responsible for deciding whether an activity is appropriate for you and for obtaining qualified advice when needed.</p><h2>Intellectual property</h2><p>Original text, branding, layout, and graphics are owned by Form First unless otherwise stated. You may link to our pages and quote short portions with attribution, but you may not republish entire articles without written permission.</p><h2>No guarantees</h2><p>We work to keep information accurate and available but do not guarantee uninterrupted access, error-free content, or specific fitness outcomes.</p><h2>Third-party services</h2><p>The site may link to or use services operated by others. Their terms and privacy practices apply to their services.</p><h2>Changes</h2><p>We may update these terms by posting a revised effective date. Continued use after an update constitutes acceptance of the revised terms.</p></main>`})
};

await mkdir(new URL("articles/", root), { recursive: true });
for (const [path, html] of Object.entries(pages)) await writeFile(new URL(path, root), html, "utf8");
for (const article of articles) await writeFile(new URL(`articles/${article.slug}.html`, root), articlePage(article), "utf8");

const urls = ["/", "/articles/", ...articles.map(a => `/articles/${a.slug}`), "/about", "/author", "/editorial-policy", "/medical-disclaimer", "/contact", "/privacy", "/terms"];
await writeFile(new URL("sitemap.xml", root), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(path => `\n  <url><loc>${base}${path}</loc><lastmod>2026-09-17</lastmod></url>`).join("")}\n</urlset>\n`, "utf8");
await writeFile(new URL("robots.txt", root), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`, "utf8");
console.log(`Built ${Object.keys(pages).length} pages and ${articles.length} original exercise guides.`);
