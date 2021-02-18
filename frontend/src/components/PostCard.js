import React, { useState } from "react";
import { Card, Button, Collapse } from "react-bootstrap";

export default function PostCard(props) {
  const { open, setOpen, posting } = props;
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{posting.postTitle}</Card.Title>
          <Card.Text>
            {posting.price}
            {posting.building}
            {posting.date}
          </Card.Text>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="more-details"
            aria-expanded={open}
          >
            More details!
          </Button>
          <Collapse in={open}>
            <div id="more-details">
              Posted by: {posting.displayName}
              Description: {posting.description}
              Contacts: Email me at {posting.email} or call me at{" "}
              {posting.phone}
            </div>
          </Collapse>
        </Card.Body>
      </Card>
    </>
  );
}

// export default function PostCard(posting) {
//   const [open, setOpen] = useState(false);
//   return (
//     <>
//       <Card style={{ width: "18rem" }}>
//         <Card.Body>
//           <Card.Title>{posting.postTitle}</Card.Title>
//           <Card.Text>
//             {posting.price}
//             {posting.building}
//             {posting.date}
//           </Card.Text>
//           <Button
//             onClick={() => setOpen(!open)}
//             aria-controls="more-details"
//             aria-expanded={open}
//           >
//             More details!
//           </Button>
//           <Collapse in={open}>
//             <div id="more-details">
//               Posted by: {posting.displayName}
//               Description: {posting.description}
//               Contacts: Email me at {posting.email} or call me at{" "}
//               {posting.phone}
//             </div>
//           </Collapse>
//         </Card.Body>
//       </Card>
//     </>
//   );
// }
