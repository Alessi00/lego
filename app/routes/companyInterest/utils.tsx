import qs from 'qs';
import NavigationTab from 'app/components/NavigationTab';
import NavigationLink from 'app/components/NavigationTab/NavigationLink';
import config from 'app/config';
import type { CompanyInterestCompanyType } from 'app/reducers/companyInterest';
import type { CompanySemesterEntity } from 'app/reducers/companySemesters';
import type { ReactNode } from 'react';

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

export const SemesterNavigation = ({ title }: { title: ReactNode }) => (
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

export const EVENT_TYPES = {
  company_presentation: {
    norwegian: 'Bedriftspresentasjon',
    english: 'Company presentation',
  },
  lunch_presentation: {
    norwegian: 'Lunsjpresentasjon',
    english: 'Lunch presentation',
  },
  course: {
    norwegian: 'Faglig arrangement',
    english: 'Course or workshop',
  },
  breakfast_talk: {
    norwegian: 'Frokostforedrag',
    english: 'Breakfast talk',
  },
  // digital_presentation: {
  //   norwegian: 'Digital presentasjon',
  //   english: 'Digital presentation',
  // },
  bedex: {
    norwegian: 'Bedriftsekskursjon (BedEx)',
    english: 'Company excursion (BedEx)',
  },
  other: {
    norwegian: 'Alternativt arrangement',
    english: 'Other event',
  },
  start_up: {
    norwegian: 'Start-up kveld',
    english: 'Start-up night',
  },
  company_to_company: {
    norwegian: 'Bedrift-til-bedrift',
    english: 'Company-to-company',
  },
};

export const SURVEY_OFFER_TYPES = {
  company_survey_security: {
    norwegian: 'Sikkerhet',
    english: 'Security',
  },
  company_survey_ai: {
    norwegian: 'Kunstig intelligens',
    english: 'Artificial intelligence',
  },
  company_survey_big_data: {
    norwegian: 'Big data',
    english: 'Big data',
  },
  company_survey_front_back_end: {
    norwegian: 'Front- og back-end',
    english: 'Front- and back-end',
  },
  company_survey_iot: {
    norwegian: 'Internet of Things',
    english: 'Internet of Things',
  },
  company_survey_gamedev: {
    norwegian: 'Spillutvikling',
    english: 'Game development',
  },
  company_survey_softskills: {
    norwegian: 'Softskills',
    english: 'Soft skills',
  },
  company_survey_fintech: {
    norwegian: 'Finansiell teknologi',
    english: 'Financial technology',
  },
};

export const OTHER_TYPES = {
  readme: {
    norwegian: 'Annonse i readme',
    english: 'Advertisement in readme',
  },
  /*
  collaboration: {
    norwegian: 'Samarbeid med andre linjeforeninger',
    english: 'Collaboration with other student organizations',
  },
  */
};

export const EVENT_TYPE_OPTIONS = [
  { value: '', label: 'Vis alle arrangementstyper' },
  { value: 'company_presentation', label: 'Bedriftspresentasjon' },
  { value: 'course', label: 'Kurs' },
  { value: 'breakfast_talk', label: 'Frokostforedrag' },
  { value: 'lunch_presentation', label: 'Lunsjpresentasjon' },
  { value: 'bedex', label: 'BedEx' },
  { value: 'digital_presentation', label: 'Digital presentasjon' },
  { value: 'other', label: 'Alternativt arrangement' },
  { value: 'sponsor', label: 'Sponser' },
  { value: 'start_up', label: 'Start-up kveld' },
  { value: 'company_to_company', label: 'Bedrift-til-bedrift' },
];

export const OFFICE_IN_TRONDHEIM = {
  yes: { norwegian: 'Ja', english: 'Yes' },
  no: { norwegian: 'Nei', english: 'No' },
};

export const COLLABORATION_TYPES = {
  collaboration_omega: {
    norwegian: 'Samarbeid med Omega linjeforening',
    english: 'Event in collaboration with Omega',
  },
  collaboration_online: {
    norwegian: 'Samarbeid med Online linjeforening',
    english: 'Event in collaboration with Online',
  },
  collaboration_tihlde: {
    norwegian: 'Samarbeid med TIHLDE linjeforening',
    english: 'Event in collaboration with TIHLDE',
  },

  /*
  collaboration_anniversary: {
    english: "Collaboration with Abakus' anniversary committee*",
    norwegian: 'Samarbeid med Abakus sitt Jubileum*',
  },
  collaboration_revue_anniversary: {
    english: "Collaboration with the revue's anniversary committee*",
    norwegian: 'Samarbeid med Revyen sitt Jubileum*',
  },
  */
  /*   collaboration_revue: {
    norwegian: 'Samarbeid med Revyen**',
    english: 'Collaboration with the revue**',
  }, */
};

export const TARGET_GRADE_TYPES = {
  '1': {
    norwegian: '1. klasse',
    english: '1st Years',
  },
  '2': {
    norwegian: '2. klasse',
    english: '2nd Years',
  },
  '3': {
    norwegian: '3. klasse',
    english: '3rd Years',
  },
  '4': {
    norwegian: '4. klasse',
    english: '4th Years',
  },
  '5': {
    norwegian: '5. klasse',
    english: '5th Years',
  },
};

export const PARTICIPANT_RANGE_TYPES = {
  first: '10-30',
  second: '30-60',
  third: '60-100',
  fourth: '100+',
};

export const COMPANY_TYPES: Record<
  CompanyInterestCompanyType,
  { norwegian: string; english: string }
> = {
  company_types_small_consultant: {
    norwegian: 'Liten konsulentbedrift ( < ~50)',
    english: 'Small consultant company ( < ~50)',
  },
  company_types_medium_consultant: {
    norwegian: 'Medium konsulentbedrift ( < 400)',
    english: 'Medium consultant company ( < 400)',
  },
  company_types_large_consultant: {
    norwegian: 'Stor konsulentbedrift ( > 400)',
    english: 'Large consultant company ( > 400)',
  },
  company_types_inhouse: { norwegian: 'In-house', english: 'In-house' },
  company_types_others: { norwegian: 'Annet', english: 'Other' },
  company_types_start_up: { norwegian: 'Start-up', english: 'Start-up' },
  company_types_governmental: { norwegian: 'Statlig', english: 'Governmental' },
};

export const PARTICIPANT_RANGE_MAP = {
  first: [10, 40],
  second: [30, 60],
  third: [60, 100],
  fourth: [100, null],
};

export const eventToString = (event) =>
  Object.keys(EVENT_TYPES)[Number(event.charAt(event.length - 2))];

export const surveyOffersToString = (offer) =>
  Object.keys(SURVEY_OFFER_TYPES)[Number(offer.charAt(offer.length - 2))];

export const otherOffersToString = (offer) =>
  Object.keys(OTHER_TYPES)[Number(offer.charAt(offer.length - 2))];

export const collaborationToString = (collab) =>
  Object.keys(COLLABORATION_TYPES)[Number(collab.charAt(collab.length - 2))];

export const targetGradeToString = (targetGrade) =>
  Object.keys(TARGET_GRADE_TYPES)[
    Number(targetGrade.charAt(targetGrade.length - 2))
  ];

export const getCsvUrl = (
  year: number | string,
  semester: string,
  event?: string
) =>
  `${config.serverUrl}/company-interests/csv/?${qs.stringify({
    year,
    semester,
    event,
  })}`;

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
    norwegian: 'Skriv litt om bedriften.',
    english: 'Write a little about your company.',
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
  startUpComment: {
    norwegian: 'Skriv litt om hva slags startup-arrangement dere ønsker.',
    english: 'Write a litte about the startup event you wish for.',
  },
  lunchPresentationComment: {
    norwegian: 'Skriv litt om hva slags lunsjpresentasjon dere ønsker.',
    english: 'Write a litte about the lunch presentation you wish for.',
  },
  bedexComment: {
    norwegian: 'Skriv litt om hva slags bedex-arrangement dere ønsker.',
    english: 'Write a litte about the bedex event you wish for.',
  },
  companyToCompanyComment: {
    norwegian:
      'Skriv litt om hva slags bedrift-til-bedriftsarrangement dere ønsker.',
    english: 'Write a litte about the company to company event you wish for.',
  },
  companyPresentationComment: {
    norwegian: 'Skriv litt om hva slags bedriftspresentasjon dere ønsker.',
    english: 'Write a litte about the company presentation event you wish for.',
  },

  text: {
    first: {
      norwegian:
        'Kan dere skrive litt om deres bedrift og hva dere jobber med?',
      english: 'Can you write a little about your company and what you do?',
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
      'Vi velger bedrifter på bakgrunn av mange faktorer. Vi ønsker å ha et sammensatt og variert tilbud som representerer flere ulike bransjer, teknologier og type arrangement. Viktige faktorer er kreativitet, nytenking og interaktivitet.',
    english:
      'We choose companies based on many factors. We want to have a varied and diverse offer that represents many different industries, technologies and types of events. Important factors are creativity, innovation and interactivity.',
  },
  companyPresentationDescription: {
    norwegian:
      'Vi ønsker gjerne at dere vil beskrive hvordan bedriftspresentasjon dere ønsker. Har dere noen tanker om innhold i presentasjonen dere ønsker å fokusere på eller typen mingling i etterkant?',
    english:
      'We would like for you to describe the type of company presentation you want. Do you have any thoughts about the content of the presentation that you want to focus on or the type of networking afterwards?',
  },

  lunchPresentationDescriptiont: {
    norwegian:
      'Skriv gjerne litt om hvordan presentasjon dere ønsker i forhold til innhold og mingling. I motsetning til bedriftspresentasjon legger denne opp til å starte ved lunsjtider og holder minglingen på Gløshaugen.',
    english:
      'Please write a little bit about the type of presentation you would like in terms of content and networking. In contrast to the company presentation, this is scheduled to start at lunchtime and will hold networking at Gløshaugen.',
  },
  courseDescription: {
    norwegian:
      'Vi ønsker gjerne at dere pitcher en ide til kurstema eller hva slags type kurs dere ønsker å arrangere. Har dere noe dere jobber mye med internt? Noe som passer ifht. de foreslåtte temaene eller noe dere tror er spennende?',
    english:
      'We would like for you to pitch an idea for a course topic or the type of course you would like to arrange. Is there something you are working on a lot internally? Something that fits with the proposed topics or something you think is exciting?',
  },
  breakfastTalkDescription: {
    norwegian:
      'Tildeling av frokostforedrag skjer uavhengig av andre tildelelser, så dere kan få frokostforedrag i tillegg til et annet arrangement. Vi ønsker gjerne at dere foreslår temaer til frokostforedraget dere ønsker å holde. Det er åpent for alt. Tidligere temaer har vært softskills, spennende caser fra jobb, teknologiutvikling, motivasjonsforedrag eller bærekraft.',
    english:
      'Allocation of the breakfast lecture is independent of other allocations, so you can have a breakfast talk in addition to another event. We would like for you to suggest topics for the breakfast lecture you want to hold. We are open for everything. Previous topics have been soft skills, exciting cases from work, technology development, motivational lectures, or sustainability.',
  },
  bedexDescription: {
    norwegian:
      'BedEx er Abakus sin bedriftsekskursjon til Oslo for studenter i 4. og 5. klasse. I løpet av 3 dager i Oslo får dere besøke 6 spennende bedrifter som tar dere imot i sine kontorlokaler. Her vil dere gjennom opplegg fra bedriften og møte med de ansatte få et ekstra godt innblikk i hva bedriften driver med, og hvordan de jobber. BedEx-teamet bestiller felles flytur fra Trondheim til Oslo på morgenen onsdag 07. september, og hotell til og med lørdag 10. september. Hjemreisen bestiller hver enkelt deltaker selv, slik at de som vil besøke familie i nærheten eller ta en langhelg i Oslo har muligheten til dette.',
    english:
      "BedEx is Abakus' company excursion to Oslo for students in their 4th and 5th year of study. Over the course of 3 days in Oslo, you will visit 6 exciting companies that will welcome you to their office space. Through activities arranged by the companies and meetings with their employees, you will gain a deeper insight into what the company does and how they operate. The BedEx team will book a shared flight from Trondheim to Oslo on the morning of Wednesday, September 7th, as well as hotel accommodations until Saturday, September 10th. Each participant is responsible for booking their own return travel, giving those who wish to visit family in the area or spend an extended weekend in Oslo the opportunity to do so.",
  },
  otherEventDescription: {
    norwegian:
      'Har dere ønsker om å arrangere noe mer enn en vanlig bedriftspresentasjon eller noe som ikke helt passer som et faglig arrangement? Skriv en beskrivelse av hva dere har tenkt eller ønsker. Også mulig å sparre med oss så kan vi finne på spennende arrangementer.',
    english:
      "Do you have any wishes to arrange something more than a regular company presentation or something that doesn't quite fit as a professional event? Write a description of what you have in mind or want. It is also possible to brainstorm with us so that we can come up with exciting events.",
  },
  startUpDescription: {
    norwegian:
      'Er dere en start-up som hadde vært spennende å høre om på en av våre start-up kvelder? Da er det bare å skrive en beskrivelse her og gjerne litt hva/hvordan arrangement dere kan ha lyst på.',
    english:
      'Are you a start-up that would be exciting to hear about at one of our start-up evenings? Then just write a description here and also what kind of event you might want.',
  },
  companyToCompanyDescription: {
    norwegian:
      'Et av våre mer spennende arrangementer er bedrift til bedrift. Her er det 3 grupper som rullerer på å besøke bedriften deres i ca. 40 minutter og ser hvordan dere har det før vi drar ut og har felles mingling. Her kan det presenteres caser fra deres bedrift, ha escape room konkurranser eller finne på noe annet gøy. Skriv gjerne om dere har noen gode ideer.',
    english:
      'One of our more exciting events is the company-to-company event. Here, there are 3 groups that in turn visit your company for about 40 minutes and see how you are doing before we go out and have a common networking event. Cases from your company can be presented, escape room competitions can be held, or something else fun can be arranged. Please write about any good ideas you have.',
  },
};

export const labels = {
  mainHeading: {
    norwegian: 'Meld interesse',
    english: 'Register interest',
  },
  subHeading: {
    norwegian:
      'Dette skjemaet skal ikke brukes for annonser. For slikt, send en e-post til ',
    english:
      'This form is not to be used for job listings. For such enquiries, send an e-mail to ',
  },
  company: {
    header: {
      norwegian: 'Navn på bedrift',
      english: 'Name of company',
    },
    placeholder: {
      norwegian: 'Bedriftsnavn',
      english: 'Company name',
    },
  },
  officeInTrondheim: {
    norwegian: 'Har dere kontorer i Trondheim egnet for besøk?',
    english: 'Do you have offices in Trondheim suited for visiting?',
  },
  contactPerson: {
    header: {
      norwegian: 'Kontaktperson',
      english: 'Contact person',
    },
    placeholder: {
      norwegian: 'Kari Nordmann',
      english: 'Jon Smith',
    },
  },
  mail: {
    norwegian: 'E-post',
    english: 'E-mail',
  },
  phone: {
    norwegian: 'Telefonnummer',
    english: 'Phone number',
  },
  semester: {
    norwegian: 'Semester',
    english: 'Semester',
  },
  events: {
    norwegian: 'Arrangementer',
    english: 'Events',
  },
  otherOffers: {
    norwegian: 'Annet',
    english: 'Other',
  },
  companyTypes: {
    norwegian: 'Bedriftstype',
    english: 'Company type',
  },
  collaborations: {
    norwegian: 'Samarbeid',
    english: 'Collaboration',
  },
  targetGrades: {
    norwegian: 'Klassetrinn',
    english: 'Target grades',
  },
  companyCourseThemes: {
    norwegian: 'Temaer som er relevant for dere',
    english: 'Topics that are relevant for you',
  },
  participantRange: {
    norwegian: 'Antall deltagere',
    english: 'Number of participants',
  },
  comment: {
    norwegian: 'Om bedriften',
    english: 'About the company',
  },
  secondComment: {
    norwegian: 'Annen kommentar',
    english: 'Other comment',
  },
  create: {
    norwegian: 'Send bedriftsinteresse',
    english: 'Submit interest',
  },
  eventDescriptionHeader: {
    norwegian: 'Pitch/forklar dine ønsker for arrangementet',
    english: 'Pitch/explain your wishes for the event',
  },
  eventDescriptionIntro: {
    norwegian:
      'Skriv gjerne litt om hvilke type arrangementer dere ønsker å arrangere. Vi prøver å planlegge med flere ulike typer arrangementer og bedrifter der vi prøver å lage et variert, spennende og nyskapende program. Våre bedriftskontakter har også muligheten til å hjelpe med å utvikle gode arrangementer.',
    english:
      'Please write a bit about what types of events you would like to arrange. We try to plan with several different types of events and companies, where we try to create a varied, exciting and innovative program. Our company contacts also have the opportunity to help develop good events.',
  },
};
