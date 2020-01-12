`A ReactJS + NodeJS App for library book management which allows issuing, returning and viewing options of current books in the library.`

Open the project directory in a terminal,
Then cd to frontend and run "npm init" to install the dependencies.
Again then cd to backend directory and run "npm init", atlast run the command "npm run dev" to start the app.
Concurrently package is used for running backend and frontend simultaneously.
Frontend -> ReactJS.
Backend -> NodeJS.
The project uses MySQL Database, so for that I've used Xampp for creating the local server as well as mysql package.

The project creates the database and tables by itself but all the initial student and books data has to be inserted directly.

Database -> library

Tables -> book - Books in the library
          student - Students related data
          borrow - Stores the student and corresponding issued books.

NodeJS utitilities -> createDB -> Creates the database if it doesn't exist
                      createTables -> Creates the tables if they doesn't exist
                      credentials -> Xampp credentials, add password accordingly

React Components -> Books -> List All the Books available
                    Issue -> Issue a book
                    Return -> List books issued by a student and option to return
                    Search -> List students who have issued a particular book
                    Nav -> Navbar
