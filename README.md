Introduction
This project is an assessment from Evya, developed to showcase front-end design capabilities. The project consists of a single-page application (SPA) that allows users to manage member data through a user interface. The primary functionalities include editing and deleting members, with the capability to delete multiple members at once.

Features
Single Page Application: The project features a single member page on the front end.
Member Management: Users can edit or delete individual members.
Bulk Deletion: Users can delete multiple members at once.
API Integration: The project integrates with a set of APIs to manage member data.
API Endpoints
The following API endpoints are used to perform CRUD operations on the member data:

Method	  URL	    Status Code	    Default Response
GET	     /members	  200	        Returns an object containing array of members and count.
GET	     /members/    200	        Returns a single member.
POST	/members	  201	        Creates a new member and returns the created member.
PUT	    /members/     200	        Updates existing member and returns the updated member.
DELETE	/members/     200	        Deletes a single member and returns the deleted member.
DELETE	/members	  200	        Deletes multiple records.

API Usage

Get All Members
URL: /members
Method: GET
Status Code: 200
Response : {
    member: [Arrays of members],
    totalMembers: 62
}

Get Member by ID
URL: /members/:id
Method: GET
Status Code: 200
Response: {member: member}



URL: /members
Method: POST
Status Code: 201
Response: 

  {
    "id": 63,
    "created_at": "2024-07-02T13:03:57.436967+00:00",
    "updates_at": "2024-07-02T13:03:57.436967+00:00",
    "name": "SofiaT Welch",
    "user_name": null,
    "is_active": false,
    "role": "Frontend Developer",
    "email": "soafia8788903@untitled.ui",
    "avatar": "https://i.pravatar.cc/150?u=sofiawelch",
    "teams": [
      "tech",
      "marketing",
      "rnd"
    ]
  }


Update an Existing Member
URL: /members/:id
Method: PUT
Status Code: 200
Response: Same as above.


Delete a Member
URL: /members/:id
Method: DELETE
Status Code: 200
Response: Returns the deleted member object.

Delete Multiple Members
URL: /members
Method: DELETE
Status Code: 200
Response: Arrays[members]

Conclusion
This project demonstrates the capability to manage member data through a user-friendly interface and integrates seamlessly with backend APIs to perform various CRUD operations. The member page provides all necessary functionalities for editing and deleting members, ensuring efficient data management.

For more detailed information, refer to the project documentation and codebase. If you have any questions or need further assistance, feel free to reach out.