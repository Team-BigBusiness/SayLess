const { Prisma } = require('@prisma/client');
const prisma = require('./client.cjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const createUser = async(username, password, email) => {
  try {
    const encryptedPassword = await bcrypt.hash(password, 5);
    
    await prisma.user.create({
      data: {
        username: username,
        password: encryptedPassword,
        email: email
      }
    })
    return { success: true, username: username };
  } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw ("The username is already in use. Please choose a different one.")
        }
      }
    throw (`Couldn't create user`, error.message);
  }
}

const getUser = async(usernameToTry, passwordToTry) => {
  try {  
    const { id, username, password } = await prisma.user.findUnique({
      where: {
        username: usernameToTry
      },
      select: {
        id: true,
        username: true,
        password: true
      }
    })

    if (!username){
      throw new Error ('Username not found.')
    }

    const passwordMatch = await bcrypt.compare(passwordToTry, password);

    if (passwordMatch) {
      const assignedToken = jwt.sign({ userId: id, username: username }, process.env.JWT_SECRET);
      console.log(assignedToken);
      return assignedToken

    } else {
      throw new Error('Could not assign token.')
    }
  } catch (error) {
    return 'Either username or password do not match our records.';
  }
}

const censorEmail = (email) => {
  const [name, domain] = email.split('@');
  const censoredName = name[0] + `***`;
  return censoredName + `@` + domain;
}

const getUserAcctDetails = async (userId) => {
  try {  
    const userDetails = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        username: true,
        email: true,
        wins: true,
        losses: true,
        avatarId: true
      }
    })

    userDetails.email = censorEmail(userDetails.email);

    return userDetails
  } catch (error){
    return (`Unable to retrieve user information`, error.message);
  }
}

const changeEmail = async(userId, newEmail) => {
  try {
    const updated = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        email: newEmail
      },
      select: {
        email: true
      }
    })

    const updatedAndCensoredEmail = censorEmail(updated.email);
    return updatedAndCensoredEmail;

  } catch (error) {
    return (`Couldn't change email`, error.message);
  }
}

const changePassword = async(userId, newPassword) => {
  try {
    const encryptedPassword = await bcrypt.hash(newPassword, 5);
    
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        password: encryptedPassword
      }
    })
  } catch (error) {
    return (`Couldn't change password`, error.message);
  }
}

const userWin = async(userId) => {
  try {
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        wins: {
          increment: 1
        }
      }
    })
  } catch (error) {
    console.error('Error updating user win:', error);
    throw error;
  }
}

const userLose = async(userId) => {
  try {
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        losses: {
          increment: 1
        }
      }
    })
  } catch (error) {
    console.error('Error updating user win:', error);
    throw error;
  }
}

module.exports = { createUser, getUser, changeEmail, changePassword, getUserAcctDetails, userWin, userLose }
