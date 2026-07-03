**AutomationX  ·  Build Guide Series**

**MAVRA**

**The Luxury Scroll-Website Build System**

*A complete student walkthrough from concept to cinematic deployment —*

*the idea, the prompts, the assets, the motion, and the final build.*

**From Concept to Cinematic Deployment**

**AutomationX Pro  ·  Student Build Guide**  
**WHAT'S INSIDE**

**Table of Contents**

*Click any line to jump straight to that chapter.*

[**01   The System, Not Just the Site**](#bookmark=id.27j4jcxayan1)

[**02   Choosing Your Concept**](#bookmark=id.yo4f4ptoo9ph)

[**03   Planning the Full Asset List**](#bookmark=id.pnv90jkaq5z)

[**04   The Universal Prompt Formula**](#bookmark=id.1kcjr3dhdsza)

[**05   Generating the Hero Variations**](#bookmark=id.8g16c47bl28t)

[**06   From Stills to Motion: Video Generation**](#bookmark=id.j6ln6by3as3j)

[**07   Start Frame vs. End Frame**](#bookmark=id.pfoe9xw4fon1)

[**08   Naming and Organizing Every File**](#bookmark=id.o47g0ac7wt15)

[**09   Editing and Merging Your Footage**](#bookmark=id.8mq2lyyso4sn)

[**10   Preparing the Scroll Hero: Frame Extraction**](#bookmark=id.ft2b5kxnio79)

[**11   Setting Up the Project**](#bookmark=id.uqtx9p20bosj)

[**12   Site Architecture**](#bookmark=id.x48rngr3off4)

[**13   The Motion Engine: Lenis \+ GSAP**](#bookmark=id.6yqr0cn62nxy)

[**14   Cinematic Text Reveals: SplitType**](#bookmark=id.fes6q5cf77md)

[**15   Building With AI Agents: Two Paths**](#bookmark=id.croc91lf9fjh)

[**16   The Iteration Loop and Refinement**](#bookmark=id.sm2euzu0c8lm)

[**17   Common Mistakes That Break the Luxury Feel**](#bookmark=id.b4gxthwn30rg)

[**18   Final Pre-Launch Checklist**](#bookmark=id.nm4ss176d5sw)

[**APPENDIX   Quick-Reference Cheat Sheet**](#bookmark=id.jakda5zbkzml)

**CHAPTER 1**

# **The System, Not Just the Site**

MAVRA is a luxury mango juice website built as a cinematic, scroll-driven experience. But the website itself is not the lesson. The lesson is the repeatable system behind it — the same sequence of decisions you can apply to any product: tea, perfume, spirits, skincare, jewelry, or anything else with a story worth telling.

Most people who try to copy a site like this get stuck before they ever touch code. They don't know what the concept should be, how to turn a vague idea into a usable prompt, which tool belongs at which stage, or how a single hero image eventually becomes a full website. This guide solves that, in order.

##   **The Five-Layer Pipeline**

Every build in this system moves through the same five layers. Skipping a layer is the single biggest reason AI-built sites end up looking generic.

* Concept — pick one product, one emotion, one story.

* Prompt system — turn the concept into a structured, repeatable prompt.

* Image generation — produce and compare hero variations before committing.

* Motion — turn the winning stills into video using the same visual language.

* Build — assemble the site from an organized asset folder, hero first.

| Why hero-first matters The hero section is where your lighting, composition, color palette, and motion language all get decided at once. Lock the hero first and every section that follows inherits its visual identity automatically. Start with the lower sections instead, and you'll spend the rest of the build trying to make everything else match a decision you haven't actually made yet. |
| :---- |

This guide uses MAVRA as the running example throughout. Every prompt, file name, and command below is the real asset list used to build it — not a simplified version. Follow it exactly once, then swap in your own product.

**CHAPTER 2**

# **Choosing Your Concept**

Before opening any tool, decide what story the site is telling. A luxury scroll site is not a list of features — it is one idea, stretched across several visual chapters. The concept formula below is the fastest way to get there.

##   **The Concept Formula**

| Product  \+  Emotion  \+  Ritual  \+  Environment  \+  Transformation |
| :---- |

Each part answers one question:

* Product — what are you actually selling?

* Emotion — what should the visitor feel in the first three seconds?

* Ritual — what small, repeatable action represents that feeling?

* Environment — what setting makes that ritual feel premium?

* Transformation — what changes between the first frame and the last?

##   **Worked Example: MAVRA**

| Element | MAVRA's Answer |
| :---- | :---- |
| Product | Premium mango juice |
| Emotion | Vitality, indulgence, golden warmth |
| Ritual | Cracking open a whole mango to reveal the pulp inside |
| Environment | Pure black studio — nothing but the fruit and the light |
| Transformation | Whole fruit  →  cracked open  →  poured juice  →  finished glass |

##   **What Makes a Concept Strong Enough to Build On**

* It has a clear visual identity (color, texture, light) that won't need to be reinvented section by section.

* It naturally breaks into 4–5 chapters, not just one hero shot.

* At least one element in it can physically transform — split, pour, bloom, unfold.

* The feeling is specific. "Premium" is not a feeling; "the calm before a ritual" is.

| Watch out Don't expand into the full site at this stage. Pick the five answers above, write them down, and stop. Everything in the next three chapters builds directly from this one table. |
| :---- |

**CHAPTER 3**

# **Planning the Full Asset List**

Generating images one at a time, with no plan, is how most students end up with a strong hero and four empty-feeling sections underneath. Before you generate anything, write out the full shot list. MAVRA's complete list is below — use it as a template and swap in your own product.

##   **Asset Categories**

| Category | Recommended Count | Purpose |
| :---- | :---- | :---- |
| Hero video | 1 | Opening scroll sequence — the brand's first impression |
| Primary product stills | 5 | The core sequence: intact → opened → bottled → poured → touched |
| Loop videos | 2–3 | Subtle motion for lower sections — pours, turns, swirls |
| Background / atmosphere | 1–2 | Orchard, liquid abstracts — section backdrops |
| Lifestyle / detail shots | 2–3 | Hand interaction and macro close-ups for texture |

##   **The MAVRA Asset List**

This is the exact 14-file list used for MAVRA, grouped by role:

| File Name | Type | Role |
| :---- | :---- | :---- |
| mavra-hero-final.mp4 | Video | Hero scroll sequence |
| mavra-01-mango-intact.png | Image | Product still — start state |
| mavra-02-mango-crack.png | Image | Product still — transformation |
| mavra-03-ingredients-fall.png | Image | Product still — energy |
| mavra-04-juice-bottle.png | Image | Product still — the product |
| mavra-05-person-touch.png | Image | Lifestyle still |
| mavra-v06-mango-pour-loop.mp4 | Video | Loop — lower section |
| mavra-v07-bottle-turn-loop.mp4 | Video | Loop — lower section |
| mavra-v08-mango-swirl-loop.mp4 | Video | Loop — lower section |
| mavra-bg-orchard-01.png | Image | Background / atmosphere |
| mavra-bg-liquid-01.png | Image | Background / atmosphere |
| mavra-lifestyle-hand-01.png | Image | Lifestyle / detail |
| mavra-bottle-closeup-01.png | Image | Lifestyle / detail |
| mavra-ingredient-macro-01.png | Image | Lifestyle / detail |
| **Why this matters** A hero alone can carry one screen. It cannot carry an entire site. The variety in this list — backgrounds, macro detail, lifestyle shots — is what keeps the sections below the hero from feeling like the same image repeated four times. |  |  |

**CHAPTER 4**

# **The Universal Prompt Formula**

"Make it look luxury" is not a prompt — it's a wish. Image and video models respond to specific, structured instructions. Every prompt in this guide, and every prompt you write for your own project, should follow the same nine-part formula.

| Subject \+ Composition \+ Lighting \+ Background \+ Material \+ Mood \+ Camera \+ Motion \+ Output rules |  |
| :---- | :---- |
| **Part** | **What It Controls** |
| Subject | Exactly what object or scene is in frame |
| Composition | Where it sits — centered, close, wide |
| Lighting | Direction, color, and harshness of light |
| Background | What's behind the subject — usually "pure black studio" |
| Material | Texture: glass, skin, pulp, condensation, fabric |
| Mood | The emotional register — cinematic, editorial, premium |
| Camera | Locked, rotating, handheld — and the realism level |
| Motion | What moves, how fast, and in what direction |
| Output rules | What to exclude — text, watermark, clutter, extra objects |

Fill in each part for your own product before you generate a single image. The formula below is the blank version:

| A \[subject\] in \[composition\], \[lighting\], on a \[background\], with \[material\] detail, \[mood\] mood, \[camera behavior\], \[motion description\]. No text, no watermark, no clutter. |
| :---- |
| **Why this matters** This is the single biggest unlock for beginners. It turns prompting from guesswork into a checklist — you're never staring at a blank box wondering what to type, you're filling in nine known slots. |

**CHAPTER 5**

# **Generating the Hero Variations**

Never generate one image and move on. For every shot, generate five or six small variations — one darker, one brighter, one tighter crop, one wider, one more editorial, one more cinematic — and choose the version with the strongest first impression before continuing.

Below are the ten real image prompts used to build MAVRA's still library, in the order they were produced. Keep your own ten in the same dark-studio, warm-light visual language so every asset feels like it belongs to the same brand.

##   **Core Product Sequence**

**FILE  mavra-01-mango-intact.png**

| A single premium Alphonso mango floating in a pure black studio background, rich golden-orange skin, visible natural texture, soft condensation droplets, dramatic warm rim light, centered composition, ultra photorealistic, luxury beverage campaign style, no bowl, no table, no extra fruit, no text, no watermark, high contrast, cinematic lighting. |
| :---- |

**FILE  mavra-02-mango-crack.png**

| A premium Alphonso mango splitting open in a dark black studio background, rich golden pulp visible inside, slow elegant crack through the fruit, juice glistening on the edges, dramatic top light, cinematic shadows, ultra photorealistic luxury product photography, centered composition, no bowl, no table, no clutter, no text, no watermark. |
| :---- |

**FILE  mavra-03-ingredients-fall.png**

| A cinematic luxury mango ingredient composition in a pure black background, mango cubes, pulp, droplets, and a few green leaf pieces falling through the air, golden-orange liquid energy, glossy reflections, suspended motion, premium beverage campaign styling, ultra photorealistic, no table, no bowl, no text, no watermark. |
| :---- |

**FILE  mavra-04-juice-bottle.png**

| A premium mango juice bottle isolated on a pure black studio background, condensation droplets on the glass, rich golden-orange juice inside, elegant luxury label design, dramatic warm rim lighting, centered composition, ultra photorealistic product photography, no table, no props, no text besides the bottle label, no watermark. |
| :---- |

**FILE  mavra-05-person-touch.png**

| A premium lifestyle shot of a human hand gently touching or holding the mango juice bottle in a black studio setting, warm golden light, elegant finger placement, high-end beverage campaign mood, ultra photorealistic, no extra body parts, no table, no clutter, no text, no watermark. |
| :---- |

##   **Backgrounds and Atmosphere**

**FILE  mavra-bg-orchard-01.png**

| A cinematic luxury mango orchard at golden hour, rows of mango trees stretching into the distance, deep green leaves and ripe golden mangoes visible among the branches, warm sunlight cutting through soft atmospheric haze, dark rich shadows with glowing highlights, premium editorial mood, highly realistic natural textures, no people, no text, no watermarks, no buildings, no modern distractions, ultra photorealistic, wide atmospheric composition designed for a premium lifestyle or scrollytelling website background. |
| :---- |

**FILE  mavra-bg-liquid-01.png**

| An abstract luxury liquid composition inspired by mango juice, rich golden-orange fluid ribbons flowing through a deep black background, glossy highlights, micro droplets, elegant curves, soft reflections, subtle depth and smoke-like movement, premium editorial art direction, no bottle, no fruit bowl, no table, no clutter, ultra photorealistic liquid texture, designed to be used as a cinematic background for a luxury scroll website, high contrast, refined, atmospheric, vertical or wide composition acceptable, no text, no watermark. |
| :---- |

##   **Lifestyle and Detail**

**FILE  mavra-lifestyle-hand-01.png**

| A refined luxury lifestyle product shot of a handsome adult man's hand holding the premium MAVRA mango juice bottle, pure black studio background, warm golden key light from above, realistic skin texture, elegant hand posture, the bottle positioned like a premium ritual object, condensation glistening on the glass, the label crisp and premium, no female, no extra body parts, no clutter, no table, no props, ultra photorealistic, high-end editorial beverage campaign style, dramatic but minimal, vertical 9:16 composition, no watermark. |
| :---- |

**FILE  mavra-bottle-closeup-01.png**

| An extreme close-up of the premium MAVRA mango juice bottle, focusing on the glass texture, condensation droplets, label embossing, and the rich orange mango pulp inside, pure black background, dramatic warm golden light with soft amber reflections, ultra detailed macro-level product photography, premium luxury beverage ad style, no clutter, no table, no extra objects, no watermark, no additional text, highly realistic, designed for a premium section detail or background overlay. |
| :---- |

**FILE  mavra-ingredient-macro-01.png**

| A cinematic macro composition of mango ingredient details suspended in space, glossy golden-orange juice droplets, fibrous mango flesh, tiny leaf fragments, and sparkling highlights against a pure black background, luxurious studio lighting, shallow depth of field, premium editorial realism, no bottle, no table, no clutter, no extra props, ultra photorealistic, rich textures, designed for use in a luxury scroll website as a section transition or detail background, no watermark, no text. |
| :---- |

**CHAPTER 6**

# **From Stills to Motion: Video Generation**

Once your stills are locked, feed them back into a video tool as reference or "ingredient" images. This keeps the bottle, the lighting, and the color language identical between the still photography and the motion — without it, your video assets will subtly drift from the look you already approved.

MAVRA used three motion loops, each built from a specific pair of reference stills:

### **Mango Pour Loop**

**FILE  mavra-v06-mango-pour-loop.mp4**

**REFERENCE IMAGES**   mavra-04-juice-bottle.png   /   mavra-03-ingredients-fall.png

| A cinematic luxury mango juice pour scene in a pure black studio background, the same premium MAVRA bottle floating in the center of the frame, dramatic warm golden spotlight from above, rich orange mango juice pouring in a slow elegant stream from the bottle into a crystal glass below, thick glossy liquid ribbons, suspended droplets, tiny highlights sparkling on the juice surface, subtle mist and condensation in the air, no visible table, no surface, no clutter, no extra props, ultra photorealistic, premium beverage commercial style, highly detailed glass reflections, luxurious editorial lighting, smooth slow-motion motion, vertical 9:16 composition, no watermark, no text other than the MAVRA bottle label. |
| :---- |

### **Bottle Turn / Reveal Loop**

**FILE  mavra-v07-bottle-turn-loop.mp4**

**REFERENCE IMAGES**   mavra-04-juice-bottle.png   /   mavra-05-person-touch.png

| A premium mango juice product reveal in a pure black studio environment, the same MAVRA bottle floating in the exact center of the frame, dramatic golden rim light and soft amber top light, the bottle slowly rotating as if on a luxury product turntable, condensation beads glistening on the glass, the label staying crisp and elegant, the orange mango pulp inside the bottle subtly shifting with the rotation, tiny floating droplets and a faint atmospheric glow, no table, no visible base, no clutter, no extra objects, ultra photorealistic luxury advertising shot, smooth slow motion, polished editorial product presentation, vertical 9:16 composition, no watermark, no extra text. |
| :---- |

### **Ingredient Swirl / Atmosphere Loop**

**FILE  mavra-v08-mango-swirl-loop.mp4**

**REFERENCE IMAGES**   mavra-01-mango-intact.png   /   mavra-03-ingredients-fall.png

| A dramatic mango ingredient swirl scene in a pure black background, warm golden studio spotlight from above, thick mango pulp, glossy orange droplets, tiny leaf fragments, and fruit fibers suspended in a circular swirling motion, the ingredients drifting and rotating like a luxury liquid sculpture, highly realistic texture and reflections, cinematic depth, soft glow on the juice particles, no bottle visible, no surface, no table, no clutter, ultra photorealistic, premium beverage campaign style, smooth elegant motion, vertical 9:16 composition, no text, no watermark. |
| :---- |
| **Why this matters** Notice that every video prompt opens with the same studio, lighting, and realism language as the still prompts in Chapter 5\. That repetition isn't accidental — it's the entire trick to making AI-generated motion feel like it belongs to the same shoot as the AI-generated stills. |

**CHAPTER 7**

# **Start Frame vs. End Frame**

Some video tools let you anchor a generation with a start frame and an end frame instead of — or in addition to — a text prompt. Understanding the difference makes your motion far more predictable.

* Start frame — the visual state the clip opens on.

* End frame — the visual state the clip resolves to.

The model fills in everything in between, which is why choosing the right pair matters more than the prompt wording itself.

| Clip | Start Frame | End Frame |
| :---- | :---- | :---- |
| Mango crack | Mango fully intact | Mango split open, pulp exposed |
| Bottle reveal | Bottle facing the camera | Bottle turned, label still readable |
| Pour loop | No visible pour, first drip only | Juice fully flowing into the glass |
| **Watch out** If your tool only accepts a single reference image, don't force a start/end pair. Upload your strongest still as the single reference and let the motion description in the prompt carry the transformation instead. |  |  |

**CHAPTER 8**

# **Naming and Organizing Every File**

By the time you have ten or more generated assets, an inconsistent naming scheme will cost you more time than any other mistake in this guide. Adopt one simple system before you generate a single file.

##   **The Naming Rules**

* Lowercase only — never mix case.

* Hyphens instead of spaces.

* A leading number prefix to lock the sort order.

* A "v" prefix on videos to separate them from stills at a glance.

* A short, descriptive suffix — never a vague "final2" or "untitled".

| Avoid | Use Instead |
| :---- | :---- |
| Mango Crack FINAL (2).png | mavra-02-mango-crack.png |
| bottle video v2 new.mp4 | mavra-v07-bottle-turn-loop.mp4 |
| IMG\_4821.png | mavra-bottle-closeup-01.png |

##   **Sorting Order**

Once everything is named, sort the files into this order before they ever touch the project folder:

1. Hero-related files first.

2. Primary product stills next.

3. Supporting lifestyle and detail stills.

4. Backgrounds and textures.

5. Loop videos last.

##   **MAVRA, Fully Sorted**

| Images (in order) | Videos (in order) |
| :---- | :---- |
| 1\. mavra-01-mango-intact.png | 1\. mavra-v06-mango-pour-loop.mp4 |
| 2\. mavra-02-mango-crack.png | 2\. mavra-v07-bottle-turn-loop.mp4 |
| 3\. mavra-03-ingredients-fall.png | 3\. mavra-v08-mango-swirl-loop.mp4 |
| 4\. mavra-04-juice-bottle.png |  |
| 5\. mavra-05-person-touch.png |  |

**CHAPTER 9**

# **Editing and Merging Your Footage**

Not every generated clip needs editing — but when you want one continuous hero reel, one brand story video, or a single composite background loop, bring the clips into Canva, CapCut, or Premiere Pro first.

##   **Merge Workflow**

1. Import every clip you intend to combine.

2. Trim each clip to only the frames you need.

3. Arrange them in the order the story should unfold.

4. Add a transition only where the cut feels abrupt — luxury motion is rarely fast-cut.

5. Export the final reel in the highest quality your tool allows.

##   **When Merging Actually Helps**

* Building one continuous intro reel from several short clips.

* Producing a single clean hero video instead of separate fragments.

* Compositing more than one loop into one background video.

##   **Export Settings**

| Setting | Recommendation |
| :---- | :---- |
| Format | MP4 |
| Bitrate | High — avoid the platform's default compression preset |
| Aspect ratio | 9:16 for vertical motion assets, 16:9 for desktop hero or landscape use |
| Compression | As light as your file-size budget allows |

**CHAPTER 10**

# **Preparing the Scroll Hero: Frame Extraction**

A scroll-scrubbed hero — where the video appears to play forward and backward as the visitor scrolls — is not built from a video file directly. It's built from an image sequence: one still frame per scroll position, swapped instantly as the user moves. This is the technique behind the smooth, controlled hero motion in MAVRA.

##   **Extracting Frames with FFmpeg**

| ffmpeg \-i mavra-hero-final.mp4 \-vf fps=24 frames/frame%04d.jpg |
| :---- |

This command takes the finished hero video and exports 24 frames per second of footage as individually numbered JPEGs, ready to be scrubbed by scroll position in the browser.

| Watch out If FFmpeg isn't available on your machine, a short Python script using OpenCV can extract frames the same way. Either path produces the same result: a numbered folder of images instead of one continuous video file. |
| :---- |

**CHAPTER 11**

# **Setting Up the Project**

With your assets generated, named, and sorted, scaffold the actual website project. Vite gives a fast, dependency-light starting point that handles heavy scroll animation well.

| npm create vite@latest mavra \-- \--template vanilla cd mavra npm install npm install gsap lenis split-type npm run dev |
| :---- |

##   **What Each Package Does**

| Package | Role |
| :---- | :---- |
| gsap | The animation engine driving every scroll-linked motion effect |
| lenis | Smooths scrolling so motion never feels jumpy or mechanical |
| split-type | Breaks headings into lines or words so text can reveal on scroll |

**CHAPTER 12**

# **Site Architecture**

A luxury scroll site has a predictable anatomy. Each section should feel like a new chapter in the same story, not another generic block of content.

| Section | Job |
| :---- | :---- |
| 1\. Hero canvas | Scroll-scrubbed frame sequence — the brand's first impression |
| 2\. Origin / story | Where the product comes from and why it matters |
| 3\. Product / anatomy | What the product actually is, in detail |
| 4\. Ritual / lifestyle | How the product is used and how it feels |
| 5\. Collection | The range, the variants, the offer |
| 6\. Newsletter / CTA | The single clear next action |
| 7\. Footer | Closing brand mark and essential links |

##   **Folder Structure**

| mavra/   public/     frames/     images/     videos/   src/     main.js     style.css     assets/   index.html |
| :---- |

##   **Asset-to-Folder Mapping**

| Asset Type | Goes In |
| :---- | :---- |
| Hero frame sequence (.jpg) | public/frames/ |
| Still images (.png) | public/images/ |
| Loop videos (.mp4) | public/videos/ |

**CHAPTER 13**

# **The Motion Engine: Lenis \+ GSAP**

Lenis takes over the browser's native scroll and smooths it; GSAP's ScrollTrigger then listens to that smoothed scroll position and drives every animation in the site from it. Wire them together once, at the top of your main script, and every section below inherits the same buttery scroll feel.

| import Lenis from 'lenis'; import { gsap } from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger';   gsap.registerPlugin(ScrollTrigger);   const lenis \= new Lenis({   lerp: 0.1,   smoothWheel: true,   autoRaf: false, });   lenis.on('scroll', ScrollTrigger.update);   gsap.ticker.add((time) \=\> {   lenis.raf(time \* 1000); });   gsap.ticker.lagSmoothing(0); |
| :---- |

**CHAPTER 14**

# **Cinematic Text Reveals: SplitType**

SplitType breaks a heading into individual lines or words so GSAP can animate them in sequence — the slow, line-by-line reveal you see in nearly every premium editorial site.

| const splitLines \= new SplitType('.split-lines', { types: 'lines' }); |
| :---- |

Once split, animate each line sliding up and fading in on scroll with a small stagger between lines — that stagger is what makes the reveal feel deliberate rather than instant.

**CHAPTER 15**

# **Building With AI Agents: Two Paths**

The same workflow — idea, hero prompt, image variations, motion, organized assets — can be assembled into a working site through two different tool paths. Choose by budget, not hype.

| Path | Best For | Tools |
| :---- | :---- | :---- |
| Premium | Speed and fine-grained control | Claude Code (in VS Code or the terminal) |
| Free / budget | Students without a paid AI subscription | Google Antigravity for the build, Gemini / Imagen / Veo / Flow for assets |

Whichever path you choose, the agent only needs three things: a clear folder of organized assets, a master prompt describing the structure you want, and a willingness to iterate rather than expecting perfection on the first attempt.

##   **Opening the Project in the Build Tool**

1. Open your build tool and load the project folder.

2. Confirm the agent can see the assets — check the frames, images, and videos folders.

3. If the agent seems confused about file names, paste a short file map directly into the prompt.

4. Give the master build prompt below.

5. Verify the result in the browser before requesting any refinement.

##   **The Master Build Prompt**

| Build a premium luxury 3D scroll website for MAVRA using vanilla HTML, CSS, and JavaScript.   Use GSAP and ScrollTrigger for all scroll-linked motion. Use Lenis for smooth scrolling. Use SplitType for text reveals.   The site must feel dark, cinematic, premium, and editorial.   Use these assets: \- hero frames in /public/frames/ \- still images in /public/images/ \- looping videos in /public/videos/   Required structure: 1\. Hero canvas scroll sequence. 2\. Origin / story section. 3\. Product / anatomy section. 4\. Ritual / lifestyle section. 5\. Collection section. 6\. Newsletter section. 7\. Footer.   Design rules: \- Premium serif headings. \- Clean sans-serif body text. \- Dark luxury color palette. \- Elegant spacing. \- Parallax. \- Pinned sections. \- Scroll-triggered text reveals. \- Strong visual hierarchy. \- No generic template feel. \- Use the assets creatively and keep the page rich.   Verify the page in the browser and refine weak sections. |
| :---- |

**CHAPTER 16**

# **The Iteration Loop and Refinement**

No agent gets a build like this right on the first prompt, and that's normal. Treat the build as a loop, not a single request.

##   **The Loop**

1. Build the hero first and confirm it feels right on its own.

2. Check the lower sections against the hero's mood.

3. Add more assets if any section feels visually thin.

4. Refine the typography pairing if it feels generic.

5. Strengthen the motion — parallax, stagger, pinned transitions.

6. Re-run the prompt with your changes.

7. Verify in the browser.

8. Repeat until every section feels intentional.

##   **The Refinement Prompt**

Once the hero is locked, use a separate, narrower prompt to improve everything below it without disturbing what already works:

| Keep the hero section untouched.   Refine only the sections below the hero. Make them more premium, editorial, and luxurious. Improve typography, spacing, motion, and depth. Use the assets more creatively. Add stronger parallax, text reveals, and section transitions. If the font pairing is weak, replace it with a more premium serif-sans combination. After updating, verify the result in the browser and refine any weak section. |
| :---- |
| **Why this matters** Explicitly protecting the hero in the refinement prompt stops the agent from "helpfully" rebuilding the one section you already approved every time you ask it to fix something else. |

**CHAPTER 17**

# **Common Mistakes That Break the Luxury Feel**

Almost every AI-built site that feels fake or inconsistent fails for one of these reasons. Check your own build against this list before you call it finished.

| Mistake | Fix |
| :---- | :---- |
| Starting to build before the concept is defined | Complete the Chapter 2 formula on paper first |
| Generic, one-line prompts ("make it luxury") | Use the nine-part formula from Chapter 4 every time |
| Camera angle or lighting drifting between assets | Reuse the same studio / lighting language across every prompt |
| Mixing too many visual styles in one project | Pick one mood in Chapter 2 and never deviate from it |
| Overloading the site with too many elements | Let the hero carry the emotional weight; keep the rest restrained |
| Choosing tools before defining the workflow | Decide the five-layer pipeline first, then pick tools per stage |
| Mass-generating before testing the prompt structure | Always generate 5–6 variations on one prompt before scaling up |

**CHAPTER 18**

# **Final Pre-Launch Checklist**

Run through this list before you consider the build finished.

* Every image and video asset is generated.

* All file names follow the lowercase-hyphen-number convention.

* Files are sorted into the correct folders.

* Hero frames are extracted and load in sequence.

* The Vite project runs locally without errors.

* Lenis and GSAP are wired together and scrolling feels smooth.

* SplitType text reveals trigger correctly on scroll.

* The build agent can see every asset it needs.

* Every lower section feels premium, not just the hero.

* Typography pairing feels deliberate, not default.

* All motion is slow, smooth, and intentional — nothing feels rushed.

If every box is checked, the site is ready to deploy.

**APPENDIX**

# **Quick-Reference Cheat Sheet**

Keep this page open while you work on your own project.

##   **1\. Concept Formula**

| Product \+ Emotion \+ Ritual \+ Environment \+ Transformation |
| :---- |

##   **2\. Prompt Formula**

| Subject \+ Composition \+ Lighting \+ Background \+ Material \+ Mood \+ Camera \+ Motion \+ Output rules |
| :---- |

##   **3\. The Build Pipeline**

| Concept  →  Prompt System  →  Image Variations  →  Motion  →  Organized Assets  →  Site Build |
| :---- |

##   **4\. Naming Rule**

| lowercase \+ hyphens \+ number prefix \+ v-prefix for video e.g.  mavra-04-juice-bottle.png   /   mavra-v07-bottle-turn-loop.mp4 |
| :---- |

##   **5\. Folder Map**

| public/frames/   →  hero frame sequence public/images/   →  still images public/videos/   →  loop videos |
| :---- |

##   **6\. Frame Extraction**

| ffmpeg \-i hero-final.mp4 \-vf fps=24 frames/frame%04d.jpg |
| :---- |

*You now have the complete system: how to choose a concept worth building, how to prompt for consistent results, how to turn stills into motion, how to organize a project an AI agent can build from, and how to iterate until it feels premium. Apply it to your own product — the steps don't change, only the story does.*