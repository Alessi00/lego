import type { Node } from 'react';
import NavigationTab from 'app/components/NavigationTab';
import NavigationLink from 'app/components/NavigationTab/NavigationLink';
import type { CompanySemesterEntity } from 'app/reducers/companySemesters';
export const sortSemesterChronologically = (
  a: CompanySemesterEntity,
  b: CompanySemesterEntity
) => {
  const semesterCodeToPriority = {
    spring: 0,
    autumn: 1,
  };
  return Number(a.year) !== Number(b.year)
    ? Number(a.year) - Number(b.year)
    : semesterCodeToPriority[a.semester] - semesterCodeToPriority[b.semester];
};
export const SemesterNavigation = ({ title }: { title: Node }) => (
  <NavigationTab
    title={title}
    back={{
      label: 'Tilbake til skjema',
      path: '/companyInterest/',
    }}
  >
    <NavigationLink to="/bdb">BDB</NavigationLink>
    <NavigationLink to="/bdb/add">Ny bedrift</NavigationLink>
  </NavigationTab>
);
export const SEMESTER_TRANSLATION = {
  spring: {
    norwegian: 'Vår',
    english: 'Spring',
  },
  autumn: {
    norwegian: 'Høst',
    english: 'Autumn',
  },
};
export const semesterToText = ({
  semester,
  year,
  language,
}: {
  semester: string;
  year: number | string;
  language: string;
}) => {
  return semester === 'spring' || semester === 'autumn'
    ? `${SEMESTER_TRANSLATION[semester][language]} ${year}`
    : '';
};
export const interestText = {
  comment: {
    norwegian: 'Skriv om bedriften eller arrangementet.',
    english: 'Write about your company or the event.',
  },
  courseComment: {
    norwegian: 'Skriv litt om hva slags faglig arrangement dere ønsker.',
    english: 'Write a litte about the course you wish for.',
  },
  breakfastTalkComment: {
    norwegian: 'Skriv litt om hva slags frokostforedrag dere ønsker.',
    english: 'Write a litte about the breakfast talk you wish for.',
  },
  otherEventComment: {
    norwegian: 'Skriv litt om hva slags alternativt arrangement dere ønsker.',
    english: 'Write a litte about the alternative event you wish for.',
  },
  text: {
    first: {
      norwegian:
        'Dersom dere ikke har hatt arrangement med Abakus før, eller om det er lenge siden vi har samarbeidet, ønsker vi at dere skriver litt om selskapet. Dette hjelper oss mye når vi skal sette sammen arrangementskalenderen.',
      english:
        'If you have not previously organized an event with Abakus previously, or if it has  been a while since we last cooperated, we would like you to tell us a bit about  your company. That is helpful when we are distributing dates for events. ',
    },
    second: {
      norwegian:
        'Vi ønsker også at dere skriver litt om hva slags type arrangement dere ser for dere å holde. Ønsker dere å gjøre noe utenfor de vanlige rammene, eller helst en standard bedpres? Uansett vil vi gjerne vite det!',
      english:
        "We'd prefer that you also write a little bit about what kind of event you would like to have. Do you want something outside the given options, or is it a regular company presentation? Either way, we'd like to know!",
    },
  },
  bedex: {
    norwegian:
      '«Husk å ranger datoer og gruppestørrelse dersom du har huket av for BedEx»',
    english: '«Remember to rank dates and groupsize if you have checked BedEx»',
  },
  anniversaryCollaboration: {
    norwegian:
      '*Samarbeid med Jubileum vil si promoteringsmuligheter på Abakus sitt jubileum i vår, eller Revyen sitt Jubileum i november 2021. Dersom det er av interesse, vil dere informeres om hva et slikt samarbeid vil innebære.',
    english:
      '*A collaboration with the anniversary committees would mean great opportunities  for your company to promote oneself. Either while Abakus has its anniversary in the  spring, or while the revue´s anniversary is celebrated in November 2021. If this is of  interest, we will further inform you what exactly is offered your company.',
  },
  revueCollaboration: {
    norwegian:
      '**Samarbeid med Revyen innebærer at dere får holde bedriftspresentasjon på datoen for Revyen, samt gode promoteringsmuligheter (logo på revy-gensere, logo på revyplakater o.l.)',
    english:
      '**A collaboration with the Revue means being their main sponsor. The Revue is a “show”, made and starred by students, and is widely popular within Abakus. As part of the collaboration, we offer you to give a Company presentation the same date as the revue. The company proceeds to join the students at the show after the presentation, guaranteeing a popular event. We also offer promotion opportunities, including your logo on merch/posters associated with the revue, etc.',
  },
  priorityReasoningTitle: {
    norwegian: 'Abakus sin begrunnelse for prioritering',
    english: 'How we in Abakus prioritize',
  },
  priorityReasoning: {
    norwegian:
      'Vi velger bedrifter på bakgrunn av mange faktorer. Vi ønsker likevel å vektlegge bedrifter med ambisjoner om et alternativt opplegg. Bedrifter som for eksempel er interessert i å samarbeide med andre linjeforeninger/bedrifter om større arrangement (som Bedrift-til-Bedrift). Vi begrunner dette med et ønske fra studentene om nytenking rundt «formatet» til en standard bedriftspresentasjon. Vi tror dette vil gi studentene et attraktivt arrangement, som er mer konkurransedyktig enn det som  tilbys i dag. ',
    english:
      'We choose companies based on a lot of factors. However, we want to prioritize companies who could be interested in creating an alternative event. Companies  who for instance want to collaborate with other student organizations/Companies to create a bigger event. This is because the students have requested that we act innovative when creating a company event (to make them  more diverse). We also think that this will make events even more in-demand, than the ones offered today.',
  },
  courseDescription: {
    norwegian:
      'Dersom dere krysser av faglig arrangement: Vi ønsker at dere pitcher en idé til kurstema. For eksempel kan det være et tema som dere jobber med mye internt i bedriften, eller noe helt annet - et tema som er nytt, spennende eller lærerikt. Generelt noe dere tror studentene vil synes er gøy og interessant.',
    english:
      'If you choose the course option: We want you to pitch an idea for a course theme. For example, it could be a topic that you work on a lot internally in the company, or something completely different - a topic that is new, exciting or educational. Generally something you think the students will find fun and interesting.',
  },
  breakfastTalkDescription: {
    norwegian:
      'Frokostforedrag er et populært tilbud i Abakus. Tidligere temaer har vært: cybersikkerhet, motivasjonsforedrag og bærekraftig IT. Dog står dere helt fritt til å velge hva dere vil prate om. Praktisk info om frokostforedrag: \n Frokostforedrag tildeles på behov til bedrifter som presenterer gode eller spennende temaer som passer til konseptet. Altså er frokostforedrag uavhengig av tildelingen på bedriftskurs / presentasjoner. \n Dere får max. 5 min til å snakke om deres egen bedrift i starten av foredraget. Deretter må det handle om et konkret tema. \n Foredraget vil finne sted om morgenen på skolen. Mange av studentene har forelesninger utover dagen, så det er ingen garanti for mingling i etterkant av foredraget. Likevel hender det at studenter blir igjen en stund for å stille spørsmål. \n Videre ønsker vi også at dere skriver litt om hva slags type foredrag dere ser for dere å holde.',
    english:
      'If you choose the breakfast talk option: Breakfast talks are a popular offer in Abakus. Previous topics have been cyber security, motivational talks and sustainable IT. Howerver, you are completely free to choose what you want to talk about. Practical information about breakfast talks: \n Breakfast talks are given on demand to companies that present good or exciting topics that fit the concept. In other words, breakfast talks are independent of the allocation to business courses / presentations. \n You get max 5 minutes to talk about your own company at the start of the lecture. Then it must be about a specific topic. \n The lecture will take place in the morning at campus. Many of the students have lectures throughout the day, so there is no guarantee of mingling after the talk. Nevertheless, it happens that students stay for a while to ask questions. \n Furthermore, we also want you to write a little about the type of talk you envision yourself giving.',
  },
  otherEventDescription: {
    norwegian:
      'Dersom dere krysser av på alternativt arrangement ønsker vi også at dere skriver litt om hva slags type arrangement dere ser for dere å holde. Ønsker dere å gjøre noe utenfor de vanlige rammene? Vi har også idéer til hva som kan være et attraktivt opplegg, så om dere er fleksible, skriv gjerne at dere er åpne for forslag. Idéer kan være Kodekamp, Lazertag, Gocart, CTF-kveld, Paint&Sip, kveld på LaBamba (Abakus sin kjeller) o.l., mulighetene er altså mange.',
    english:
      "We'd prefer it if you also write a little bit about what kind of event you would like to have. Do you want something outside the given options? We can also provide different ideas, which could make your company stand out, and make the event itself more popular. In that case, please tell us that you are open to hear our suggestions. Ideas can be: Lazertag, CTF, Paint&Sip, A night at LaBamba (Abakus` own pub). In other words, the possibilities are many and varied.",
  },
};