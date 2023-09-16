# Event Manager Web Application

Manage and streamline your event's guest list with this intuitive web application. From individual additions to bulk uploads, ensure every guest is accounted for.

## Features

- **Guest Management**: View all guests, add them individually, or bulk upload from a text file.
- **Guest Verification**: Quickly verify if a guest is on your list, and view those confirmed as attending.
- **Template System**: Use the provided template to understand the correct format for bulk uploads.
- **Dynamic Guest Lists**: Retrieve the guest list in machine-readable formats for analytics or other integrations.

## Technological Stack

- **Backend**: Flask web framework
- **Database**: SQLAlchemy ORM
- **Frontend**: Jinja2 templating engine
- **User Interaction**: Integrated Flask request handling

## Installation & Setup

1. Clone the repository:

   ```
   git clone https://github.com/teddyCodex/event_manager.git
   ```

2. Navigate to the project directory and install the required packages:

   ```
   cd event_manager-main
   pip install -r requirements.txt
   ```

3. Run the application:

   ```
   python run.py
   ```

4. Access the application in your preferred web browser at:
   ```
   http://localhost:5000/
   ```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
