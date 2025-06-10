import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'; // we'll make this next

// 📝 Letters mapped to exact ISO date strings
const letters = {
  '2025-03-13': `Mina,

Happy birthday. It’s weird not being there with you today, not being able to say it face to face or see you roll your eyes at me for making a big deal out of it. But even from a distance, I hope you feel how much you mean to me.

I’m not gonna lie, it hurts a bit not being able to celebrate with you. The silence makes the space between us louder than I want. But I want you to know this today, more than any day, I’m thinking of you. Your laugh, your stubbornness, the way you light up a room without trying.

You deserve the world, Mina. And even if I’m not right there handing it to you, I’m holding on to the hope that someday I can make you feel that every day, not just on your birthday.

So, here’s me sending all the love I can from wherever I am, hoping it finds you and sticks. Because you’re worth every word, every thought, every beat of this messy heart. PLease know that i love you so much and i will love you forever no matter what`,

  '2025-03-14': `Mina,

The day after your birthday feels heavier when you’re not around. I keep thinking about what you’re doing, if you smiled today, if you felt even a little bit like I’m there with you. I want to be. I want to be the reason you don’t feel alone.

Sometimes I wish I could just snap my fingers and close the distance. But since I can’t, all I’ve got are these words and the hope that you catch what I’m trying to say you matter, so damn much.`,

  '2025-03-15': `Hey,

I’m trying not to overthink all the miles between us, but it’s tough. It’s like every quiet moment reminds me you’re not just a text or a memory — you’re everything I want but can’t hold right now.

I don’t know if this makes sense, but it’s honest. That’s all I can promise.`,

  '2025-03-16': `Mina,

I keep catching myself hoping you’re thinking about me too, or missing me in a way that hurts. Maybe that sounds selfish, but it’s the truth.

You’ve been my constant even when we’re apart, and I’m grateful for that more than I say.`,

  '2025-03-17': `Hey Mina,

Sometimes I wonder if you feel the distance the same way I do. Like there’s this invisible weight pressing on us, and no matter how much I want to reach through, it won’t budge.

But I’m here. I’m still fighting for us, even if it’s quiet.`,

  '2025-03-18': `Mina,

I miss the way things used to be, the easy closeness, the little everyday stuff that made everything feel simple. Now it’s like we’re on opposite sides of a wall, and I’m trying to figure out how to climb it without falling.

I hope you’re holding on too.`,

  '2025-03-19': `Hey,

I don’t want to flood you with words, but sometimes silence feels worse than any mess I make. So here’s me, breaking it with something real — I miss you. More than you probably want to hear.`,

  '2025-03-20': `Mina,

This distance isn’t just space, it’s a test. A hard one. But I believe in us enough to keep going, even when it feels impossible. Because you’re not just part of my life, you’re part of me. I truly miss you so much even if we are talking.`,
  // previous letters ...

  '2025-03-28': `Mina,

It’s wild how normal things feel when you’re around. Like, nothing extra needs to be said because being with you makes everything better, even the boring stuff. I love that.`,

  '2025-03-29': `There’s something about your laugh that just melts the stress away. I don’t know how you do it, but it’s like a reset button for my brain. Keep doing that, yeah?`,

  '2025-03-30': `Mina,

I was thinking about how lucky I am to have you next to me. It’s not always perfect, but it feels real, and that’s what counts.`,

 '2025-05-27': `It’s crazy how empty the room feels without you. I keep looking for you in everything, but it’s just silence. I miss you more than I thought was possible.`,

  '2025-05-28': `Hey,

Every little thing reminds me of you—your laugh, your smile, that look you get when you’re focused. It hurts knowing you’re not here anymore. I don’t know how to do this without you.`,

  '2025-05-29': `Mina,
I keep replaying every moment, every word, wondering where we slipped. I miss the way you made the world less heavy. I miss you.`,

  '2025-05-30': `This space between us feels like it’s swallowing me whole. I’m trying to hold on to what we had, but it’s slipping through my fingers. I’m lost without you.`,

  '2025-05-31': `Mina,
I don’t know if you feel the same, but I’m still here.
Still holding on to the hope that maybe, somehow, we find a way back.
Because right now, it feels like everything’s falling apart.`,

  '2025-06-01': `Mina,
I’m tired of pretending I’m okay. I’m not.
I miss you so damn much it’s like a weight in my chest.
I don’t know how to move forward without you.`,

  '2025-06-02': `Mina,
I’m haunted by the silence you left behind.
I want to scream, to cry, to tell you how much I’m broken.
But all I can do is write these words and hope they reach you somehow.`,

  '2025-06-03': `Mina,
I see you in every corner of my mind.
I don’t want to forget, even if it hurts.
Because forgetting feels like losing you twice.`,

  '2025-06-04': `Mina,
I’m drowning in memories. Every smile, every touch, every fight.
I miss the good and the bad because it was us.
And now it’s just me, lost without you.`,

  '2025-06-05': `I don’t know how to say goodbye when my heart still screams your name.
I’m caught between wanting to move on and wanting you back.
It’s a war I’m losing.`,

  '2025-06-06': `If I could turn back time, I wouldn’t waste a second without telling you how much you mean to me.
Now I’m left with silence and regret.`,

  '2025-06-07': `I still miss you every damn day.
It’s like this ache that doesn’t fade.
I hope you’re out there somewhere, thinking of me too.`,

  '2025-06-08': `Even though we’re apart, I still carry you with me—in every breath, every thought.
I don’t know how to let go, and honestly, I’m not ready to try.`,

  '2025-06-09': 'today was probably my worst day without you, my stupid ass started crying in the middle of the exam and couldnt finish it and had to go out of it. I dont know what to do without you anymore. it hurts so much',  


};



const formatDate = (date) => date.toISOString().split('T')[0];

const MyCalendar = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('2025-03-13'); // default to March 13

  const handleDateClick = (date) => {
    setSelectedDate(formatDate(date));
  };

  return (
    <div className="calendar-wrapper">
      {/* 🏠 Home Button */}
      <button className="home-button" onClick={() => navigate('/room')}>
        🏠
      </button>

      {/* Letter on the left */}
      <div className="letter-display">
        <div className="envelope">
          {selectedDate && letters[selectedDate] ? (
            <>
              <h3>📜 Letter for {selectedDate}</h3>
              <p>{letters[selectedDate]}</p>
            </>
          ) : (
            <p className="no-letter">Click a date with a red dot to read a letter 💌</p>
          )}
        </div>
      </div>

      {/* Calendar on the right */}
      <div className="calendar-container">
        <Calendar
          onClickDay={handleDateClick}
          tileContent={({ date, view }) => {
            const key = formatDate(date);
            return letters[key] ? <div className="dot" /> : null;
          }}
        />
      </div>
    </div>
  );
};

export default MyCalendar;
