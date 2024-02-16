import { model, Schema } from 'mongoose';

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [4, 'Title must be at least 4 characters'],
      maxlength: [90, 'Title cannot be more than 50 characters'],
      trim: true,
      unique: [true, 'Event name should be unique'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      // minlength: [20, 'Description must be at least 20 characters long'],
    },
    club: {
      type: String,
      // enum:[''],
      required: [true, 'Club name is required'],
    },
    minimumTeamLength: {
      type: Number,
      required: [true, 'Enter the minimum team size'],
      min: 1,
      default: 1,
    },
    maximumTeamLength: {
      type: Number,
      required: [true, 'Enter the maximum team size'],
      min: 1,
      default: 1,
    },

    teams: [
      {
        teamName: {
          type: String,
          required: [true, 'You must enter a team name'],
          // unique: [true, 'This team name is already been taken'],
        },
        college: {
          type: String,
          required: [true, 'Please enter the college name'],
        },
        participants: [
          {
            participantName: {
              type: String,
              required: [true, 'Participant name is required'],
            },
            participantPhone: {
              type: String,
              required: [true, 'Phone number is required'],
            },

            participantBloodGroup: {
              type: String,
              required: [true, 'Blood group is required'],
            },
          }
        ],
        paymentReferenceNumber: {
          type: String,
          required: [true, 'Payment reference number is required'],
        },
        paymentVerified: {
          type: Boolean,
          default: false
        },
        registeredBy: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],

    tcaCoordinators: [
      {
        tcaCoordinatorName: {
          type: String,
          required: [true, 'Please enter the name of coordinator'],
        },
        tcaCoordinatorRollNumber: {
          type: Number,
          required: [true, 'Please enter the roll number of coordinator'],
          length: 8,
        },
        tcaCoordinatorContact: {
          type: Number,
          required: [true, 'Please enter coordinators mobile number'],
          length: 10,
        }
      },
    ],


    clubCoordinators: [
      {
        clubName: {
          type: String,
          required: [true, 'Club coordinator must belong from a club'],
        },
        clubCoordinatorName: {
          type: String,
          required: [true, 'Please enter the name of coordinator'],
        },
        clubCoordinatorRollNumber: {
          type: Number,
          required: [true, 'Please enter the roll number of coordinator'],
          length: 8,
        },
        clubCoordinatorContact: {
          type: Number,
          required: [true, 'Please enter coordinators mobile number'],
          length: 10,
        }
      },
    ],


    facultyCoordinators: [
      {
        facultyName: {
          type: String,
          required: [true, 'Faculty name is required'],
        },
        facultyEmail: {
          type: String,
          required: [true, 'Faculty email is required'],
        },
        facultyBranch: {
          type: String,
          required: [true, 'Faculty branch is required'],
        },
      },
    ],

    numberOfParticipants: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required:[true,'Please Login.'],
    },
  },
  {
    timestamps: true,
  }
);

const Event = model('Event', eventSchema);

export default Event;


