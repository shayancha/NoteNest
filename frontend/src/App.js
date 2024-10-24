import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomepageNotLoggedIn from './components/HomepageNotLoggedIn';
import HomepageLoggedIn from './components/HomepageLoggedIn.js';
import SignUp from './components/SignUp.js';
import SignIn from './components/SignIn.js';
import CreatedCollection from './components/CreatedCollection.js';
import ViewStudentProgress from './components/ViewStudentProgress.js';
import InviteOthers from './components/InviteOthers.js';
import CreatedPDF from './components/CreatedPDF.js';
import CreatedVideo from './components/CreatedVideo.js';
import CreateCollection from './components/CreateCollection.js';
import UploadPDF from './components/UploadPDF.js'; 
import UploadVideo from './components/UploadVideo.js'; 
import JoinedCollection from './components/JoinedCollection.js'; 
import JoinedPDF from './components/JoinedPDF.js';
import JoinedVideo from './components/JoinedVideo.js';
import ViewProgress from './components/ViewProgress.js';
import ViewSpecificStudentProgress from './components/ViewSpecificStudentProgress.js'; 
import ReplacePDF from './components/ReplacePDF.js'; 
import ReplaceVideo from './components/ReplaceVideo.js'; 
import JoinCollection from './components/JoinCollection';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomepageNotLoggedIn />} />
          <Route path="/home-logged-in" element={<HomepageLoggedIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="/create-collection" element={<CreateCollection />} />
          <Route path="/upload-pdf" element={<UploadPDF />} />
          <Route path="/upload-video" element={<UploadVideo />} />

          <Route path="/created-collection/:id" element={<CreatedCollection />} />
          <Route path="/joined-collection/:collectionId" element={<JoinedCollection />} />

          <Route path="/join-collection" element={<JoinCollection />} />

          <Route path="/joined-pdf" element={<JoinedPDF />} />
          <Route path="/joined-video" element={<JoinedVideo />} />

          <Route path="/created-collection/:collectionId/:materialId/students-progress" element={<ViewStudentProgress />} />
          
          {/* <Route path="/created1" element={<CreatedCollection />} />
          <Route path="/created1/view-student-progress" element={<ViewStudentProgress />} />
          <Route path="/created1/view-student-progress/student1" element={<ViewSpecificStudentProgress />} />
          <Route path="/created1/invite-others" element={<InviteOthers />} />
          <Route path="/created1/pdf1" element={<CreatedPDF />} />
          <Route path="/created1/video1" element={<CreatedVideo />} />
          <Route path="/created1/replace-pdf" element={<ReplacePDF />} />
          <Route path="/created1/replace-video" element={<ReplaceVideo />} /> */}

          {/* <Route path="/joined1" element={<JoinedCollection />} />
          <Route path="/joined1/pdf1" element={<JoinedPDF />} />
          <Route path="/joined1/video1" element={<JoinedVideo />} />
          <Route path="/joined1/view-your-progress" element={<ViewProgress />} />  */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
