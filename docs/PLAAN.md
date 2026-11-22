# Rütm – tööjaotus ja projekti struktuur

Mobiilirakenduste arendamise grupitöö · 6 liiget · Expo + React Native + TypeScript
Disain: https://claude.ai/artifact/HVKWCRXUy7Pp1KaRvHd1xZ (ekraanid 1–21)

---

## 1. Põhiotsused enne alustamist

| Teema | Otsus | Miks |
|---|---|---|
| Raamistik | Expo SDK 58 + React Native 0.88.1 + TypeScript | Uusim SDK. Expo määrab React Native'i versiooni – teeke paigalda alati `npx expo install`. |
| Navigatsioon | `expo-router` (failipõhine, ekraanid `src/app/`) | Iga ekraan on oma fail, nii on tööjaotus lihtne ja git-konflikte vähe. |
| Taustasüsteem | Supabase (Auth + Postgres + Storage) | Tasuta, kiire seadistada, e-posti ja Google'i login olemas. |
| Kaart | `react-native-maps` | Töötab Androidis ka Expo Go's, õpetaja testib Androidis. |
| Asukoht | `expo-location` | Esialgu ainult esiplaanil (ekraan lahti). Taustal jälgimine on lisavõimalus. |
| Teavitused | `expo-notifications` | Hoog ja müks. |
| Pilt | `expo-image-picker` | Profiilipilt. |
| Build | EAS Build → Androidi APK | Õpetajale saab anda valmis APK. |

**MVP vs lisad.** Kõigepealt peab töötama põhiline: konto → eesmärk → trenni salvestamine → kokkuvõte → ajalugu → tiim ja hoog. Lisad, kui aega jääb: Apple'i login (ainult iOS), terviseandmed (Health Connect), taustal GPS, päris push-teavitused serverist.

---

## 2. Kaustastruktuur

Täpne skeem koos vastutajatega on [README.md](../README.md) punktis 2, arhitektuur punktis 3 ja navigatsioon punktis 4.

---

## 3. Ühised komponendid (teeb Liige 1 esimesena)

Need tagavad, et rakendus näeb ühtne välja, mitte kokku lapitud (hindamiskriteerium 5). **Keegi ei tee oma nuppu ega värvi, kõik kasutavad neid.**

| Komponent | Kasutus disainis |
|---|---|
| `Button` (variant: `primary` / `secondary` / `dark` / `text`) | laimiroheline peamine, tume ääris teisene, tume "Jätka", tekstilink |
| `Card` (variant: `light` / `dark`) | valged ja tumedad kaardid |
| `StatCard` | Aeg / Distants / Tempo kastid |
| `SegmentedControl` | Rütm ↔ Kaart, Ülevaade ↔ Voog |
| `Chip` | ajaloo filtrid |
| `Toggle` | "Jaga tiimi voogu" |
| `Avatar` | tähega või pildiga ring |
| `ActivityIcon` | Jooks / Kõnd / Ratas ikoonid |
| `HoogButton` | hoo nupp koos olekuga |
| `StepIndicator` | seadistuse sammud 1/5 |
| `ScreenHeader` | tagasinupp + pealkiri |
| `WeekDots` | nädala täpid (Täna, Tiim, kokkuvõte) |
| `TabBar` | ovaalne alumine menüü + "+" |

Valmis: `Button`, `Card`, `Screen`, `TabBar` (algversioon), `PlaceholderScreen`. Ülejäänud teeb Liige 1.

**Teema väärtused (disainist)** on failides `src/theme/`:
- taust `#EEF1EA`, tekst `#15201A`, aktsent `#C6F24E`, kaart `#FFFFFF`
- teisene tekst `#56615A`, `#3A4A40`, äärised `#D3DAD1`, `#E1E6DE`
- fondid: Space Grotesk (pealkirjad, numbrid), Inter (sisu)
- nupud: kõrgus 56–64, raadius = pool kõrgusest

---

## 4. Andmemudel (Supabase)

```
profiles      id, name, avatar_url, weekly_goal_days (2–5), min_minutes (15), created_at
teams         id, name, invite_code, created_at
team_members  team_id, user_id, joined_at
activities    id, user_id, type ('run'|'walk'|'bike'), started_at, duration_s,
              distance_m, avg_pace_s_per_km, route (json: [lat,lng][]),
              splits (json), shared_to_team (bool)
reactions     activity_id, user_id, created_at      -- "hoog"
nudges        from_user, to_user, created_at        -- "müks"
```

Tuletatud väärtused (arvutatakse rakenduses, `features/activities`):
- **aktiivne päev** = päev, kus trennide kogukestus ≥ `min_minutes`
- **nädal täis** = aktiivseid päevi ≥ `weekly_goal_days`
- **rütm** = mitu nädalat järjest täis
- **tiimi nädal** = liikmete aktiivsete päevade summa / (liikmete arv × eesmärk)

Tüübid on kirjas failis `src/types/index.ts` ja näidisandmed failis `src/mocks/data.ts`, et kõik saaksid töötada enne, kui backend valmis on.

---

## 5. Tööjaotus

Ekraanide numbrid vastavad disainile. Iga liige vastutab oma ekraanide, nende loogika ja README vastava osa eest.

**Ülevaade**

| Liige | Osa | Ekraanid | Maht |
|---|---|---|---|
| 1 | Alus, disainisüsteem, navigatsioon, Supabase; hiljem teavitused | – | suur alguses, hiljem kergem |
| 2 | Autentimine, profiil, APK build | 1–3, 19 | keskmine |
| 3 | Seadistus ja õigused, Täna | 4–9 | keskmine |
| 4 | Trenni salvestamine, kaardikomponent | 10–13 | suur (kõige tehnilisem) |
| 5 | Kokkuvõte, ajalugu, nädala ja rütmi loogika | 14–15 | keskmine |
| 6 | Tiim, voog, postitus, hoog ja müks | 16–18 | keskmine |

### Liige 1 – Alus, disainisüsteem, navigatsioon ja teavitused
- Expo projekti loomine, TypeScript, ESLint + Prettier, kaustastruktuur
- `src/theme/` ja kõik `components/ui/` komponendid (p 3)
- `expo-router` paigutused, alumine menüü `TabBar` koos "+" nupuga
- Supabase projekti loomine ja `lib/supabase.ts`, andmebaasi tabelid
- **Hiljem:** teavitused (`expo-notifications`) – hoog, müks, nädala meeldetuletus
- README koondamine
> ⚠️ Peab alustama esimesena – teised sõltuvad teemast ja komponentidest. Esimese nädala jooksul valmis.

### Liige 2 – Autentimine ja profiil
- **1 Alustus**, **2 Logi sisse**, **3 Registreeru**
- Supabase Auth: e-post + parool, Google'i login
- Sessiooni hoidmine, suunamine (sisse logimata → Alustus, seadistamata → onboarding)
- Profiili rea loomine registreerimisel
- **19 Profiil**: profiilipilt (`expo-image-picker` + Supabase Storage), seaded, väljalogimine, konto kustutamine
- EAS Build seadistus (Androidi APK) ja README "Kompileerimine ja paigaldamine" osa
- (Lisa) Apple'i login ainult iOS-is

### Liige 3 – Seadistus, õigused ja Täna
- **4 Nädala eesmärk**, **5 Asukoht**, **6 Terviseandmed**, **7 Teavitused**, **8 Kutsu tiimi**
- Õiguste küsimine: `expo-location`, `expo-notifications`
- Tiimi loomine, kutsekood/-link, olemasoleva tiimiga liitumine
- Eesmärgi salvestamine profiili
- **9 Täna**: rütm, nädala täpid, tiimi kaart (kasutab Liige 5 nädala/rütmi loogikat)
- (Lisa) Health Connect Androidis

### Liige 4 – Trenni salvestamine
- **10 Vali tegevus**, **11 Salvestus – Rütm**, **12 Paus**, **13 Salvestus – Kaart**
- `features/tracking`: asukoha jälgimine, distants (haversine), tempo, taimer, paus/jätka
- Ühine kaardikomponent `RouteMap` (`react-native-maps` + marsruut) – kasutavad ka ekraanid 14 ja 18
- Trenni salvestamine `activities` tabelisse
> Kõige tehnilisem osa – sobib kõige kogenumale.

### Liige 5 – Kokkuvõte ja ajalugu
- **14 Trenni kokkuvõte**, **15 Ajalugu**
- Kalender (täis päevad), kuu kokkuvõte, filtrid, trennide nimekiri
- Kilomeetrite vahetulemused, "Jaga tiimi voogu" lüliti
- `features/activities`: aktiivse päeva, nädala ja rütmi arvutus (kasutavad ka Täna ja Tiim)

### Liige 6 – Tiim ja voog
- **16 Tiim – ülevaade**, **17 Voog**, **18 Voo postitus**
- Liikmete nädalaseis, "Müksa", hoog (lisa/eemalda)
- Voo päringud: tiimikaaslaste jagatud trennid ja nende hood

### Kõik koos
- Iga liige kirjutab oma osa kohta README-sse lõigu ja kommenteerib oma koodi
- Esitluses räägib igaüks oma osast
- Viimane nädal: ühine testimine Androidis

---

## 6. Git-reeglid (hindamiskriteerium 2)

1. Igaüks seadistab oma nime: `git config user.name "Ees Perenimi"` ja `git config user.email "..."` (sama mis GitHubis).
2. `main` on kaitstud – otse sinna ei pushita.
3. Iga ülesanne oma harus: `feature/auth-login`, `feature/record-map` jne.
4. Pull Request → vähemalt üks teine liige vaatab üle → merge.
5. Väikesed ja selged commitid **inglise keeles** (Conventional Commits): `feat: add pace calculation`, `fix: tab bar covering content`, `docs: add recording section to README`.
   - `feat` – uus funktsioon, `fix` – veaparandus, `docs` – dokumentatsioon, `style` – välimus/vormindus, `refactor` – koodi ümberkorraldus, `chore` – seadistus, teegid
6. Ära commiti saladusi – Supabase võtmed `.env` faili, mis on `.gitignore`-s.

## 7. Koodi kvaliteet (hindamiskriteerium 3)

**Keelereeglid:**

| Mis | Keel |
|---|---|
| README, docs/, rakenduse tekstid | eesti |
| Koodikommentaarid | eesti |
| Muutujad, funktsioonid, failinimed | inglise |
| Commitid, harude nimed, Pull Requestid | inglise |

- Iga fail algab lühikese kommentaariga: mida see teeb.
- Funktsioonidel JSDoc-kommentaar: mida teeb, parameetrid, tagastus.
- Ekraanid on õhukesed: loogika `features/` kaustas hook'ides (nt `useTracking()`, `useWeekProgress()`).
- Värvid ja suurused tulevad ainult `theme/`-st, mitte otse koodi kirjutatuna.

---

## 8. README sisu (hindamiskriteerium 4)

1. Rakenduse kirjeldus ja ekraanipildid
2. Tegijad ja kes mida tegi
3. Kasutatud SDK-d, API-d ja teegid (Expo SDK versioon, React Native, Supabase, expo-location, react-native-maps …)
4. Kuidas käivitada arenduses (`npm install`, `.env`, `npx expo start`)
5. Kuidas kompileerida ja paigaldada (EAS Build → APK, paigaldamine Androidi telefoni)
6. Andmemudel
7. Teadaolevad piirangud

---

## 9. Ajakava (kohanda tähtajaga)

| Etapp | Mis | Kes |
|---|---|---|
| Nädal 1 | Projekt, teema, komponendid, navigatsioon, tüübid, näidisandmed, Supabase tabelid | Liige 1 (teised: seadistavad arenduskeskkonna, uurivad oma teeke) |
| Nädal 2–3 | Ekraanid näidisandmetega, igaüks oma harus | Kõik |
| Nädal 4 | Ühendamine Supabase'iga, voogude läbiproovimine | Kõik |
| Viimane nädal | Testimine Androidis, vigade parandus, README, APK, esitlus/video | Kõik |
| 1 päev enne esitust | GitHubi link gruppi | Liige 1 |

---

## 10. Riskid

- **Taustal GPS** vajab development buildi ja keerulisi õigusi → MVP-s ainult esiplaanil.
- **Apple'i login** ei tööta Androidis → näita nuppu ainult iOS-is.
- **Terviseandmed** on lisavõimalus, mitte MVP.
- **Liige 1 on pudelikael** esimesel nädalal → teised ei oota, vaid valmistavad oma teegid ette ja kirjutavad loogikat (nt tempo arvutus) eraldi.
