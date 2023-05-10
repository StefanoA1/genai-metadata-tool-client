// Fixtures
const inputFixtures = {
  title:
    '"Mastering Machine Learning: A Comprehensive 7-Step Study Plan for Beginners with Python, Kaggle, and Andrew Ng\'s Machine Learning Specialization on Coursera"',
  language: 'English.',
  summary:
    "Learn machine learning in seven steps over three months by building a foundation in math, mastering Python and key libraries, completing Andrew Ng's Machine Learning Specialization on Coursera, and practicing real-world problems on Kaggle, with additional tips for job seekers including starting a blog.",
  teaser:
    '🤖 Ready to learn machine learning? 🚀 Discover this 7-step study plan by Patrick, a machine learning developer advocate. From math basics to Kaggle competitions, this guide provides everything you need to know! #MachineLearning #Python #DataScience #Kaggle #AI',
  detailed_summary:
    'The video gives a seven-step learning path for machine learning, starting with basic math and Python, and moving on to key Python libraries, an extensive machine learning course and hands-on practice on Kaggle.com. The video also provides tips for job search and suggests starting a blog to deepen knowledge and increase chances of getting an interview. Two books are recommended for those preferring to learn through books.',
  key_phrases: [
    'I divided this learning path into seven steps that should take you about three months to finish.',
    "The demand for machine learning engineers is still increasing every year. So it's a great skill to have.",
    'The most popular and in my opinion also one of the best ones is the machine learning specialization by Andrew Ng on Coursera.',
    'ML Ops is a whole field on its own. So I may cover this in a separate video.'
  ],
  acquired_skills: ['Technology Skills', 'General Personal Development', 'Data & Analytics'],
  prerequisites: [
    'Basic math skills such as algebra and calculus are required to understand the underlying concepts of machine learning.',
    'Python programming language is essential for machine learning and data science, so having decent Python skills is essential and the user recommends two free Python courses to start with.',
    'The machine learning tech stack consists of important Python libraries such as NumPy, Pandas, and Matplotlib, which are used in almost every machine learning project, and are recommended to be learned in the early stages of machine learning learning.'
  ],
  glossary: [
    {
      name: 'Machine learning',
      def: 'A branch of artificial intelligence that enables machines to learn.'
    },
    {
      name: 'Developer advocate',
      def: 'A developer who works with a particular platform or technology.'
    },
    {
      name: 'Python',
      def: 'A high-level programming language used for general-purpose programming and machine learning.'
    },
    {
      name: 'NumPy',
      def: 'A library for the Python programming language, adding support for large, multi-dimensional arrays and matrices.'
    },
    {name: 'Pandas', def: 'A software library for data manipulation and analysis.'},
    {
      name: 'Matplotlib',
      def: 'A plotting library for the Python programming language and its numerical mathematics extension NumPy.'
    },
    {
      name: 'Andrew Ng',
      def: 'A computer scientist and entrepreneur who is one of the leading figures in AI and machine learning.'
    },
    {name: 'Kaggle', def: 'A platform for data science competitions.'},
    {
      name: 'Data pre-processing',
      def: 'A data mining technique that involves transforming raw data into an understandable format.'
    },
    {name: 'ML Ops', def: 'Machine learning operations.'}
  ],
  followups:
    '1. Aurélien Géron - "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow: Concepts, Tools, and Techniques to Build Intelligent Systems" - O\'Reilly Media, 2019 - A practical guide for machine learning beginners and practitioners. https://www.goodreads.com/book/show/38886397-hands-on-machine-learning-with-scikit-learn-keras-and-tensorflow\n\n2. Andrew Ng - "Machine Learning Yearning" - Goodfellow Publishers, 2018 - A book that gives practical advice on how to implement a successful machine learning program. https://www.goodreads.com/en/book/show/40181440-machine-learning-yearning\n\n3. Ian Goodfellow, Yoshua Bengio, and Aaron Courville - "Deep Learning" - MIT Press, 2016 - A comprehensive textbook on deep learning for students and practitioners. https://www.goodreads.com/book/show/24043412-deep-learning',
  assessement:
    "Sure, here's a quiz based on the text you provided:\n\n1. Knowing math is not necessary for machine learning.\n- False. Knowing the underlying math provides a better understanding of how the algorithms work and makes it easier to solve problems. Plus, math can add to the excitement of the topic.\n- Fun fact: Alan Turing was known for creating the concept of the Universal Machine, which was a mathematical notion that laid the foundation for computer science.\n\n2. Kaggle is a great platform to practice machine learning and build a portfolio.\n- True. Kaggle provides thousands of data sets and challenges to help build machine learning skills. It can also be used to develop a portfolio of projects and demonstrate skills to potential employers.\n- Fun fact: Kaggle was acquired by Google in 2017 but continues to operate as a separate subsidiary.",
  thumbnail:
    'https://oaidalleapiprodscus.blob.core.windows.net/private/org-tci3RizVB8h2nVnLMmNOrgTo/user-6C1v0WlHzfz1sG44OIRldzPm/img-iyU1PCQpRbeNltHMjwhiwqVx.png?st=2023-05-10T07%3A24%3A40Z&se=2023-05-10T09%3A24%3A40Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-10T02%3A40%3A55Z&ske=2023-05-11T02%3A40%3A55Z&sks=b&skv=2021-08-06&sig=eHWwR2%2BASDt94045sccA/vvnlADlD/ciCrO0kScmAtg%3D'
};

export function exportContentToJson(
  input: Record<string, unknown> = inputFixtures,
  fileName = 'output.json'
): void {
  // eslint-disable-next-line no-console
  console.log('Exporting to JSON file');
  const jsonContent = JSON.stringify(input);

  const blob = new Blob([jsonContent], {type: 'application/json'});

  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = fileName;
  downloadLink.click();
}
