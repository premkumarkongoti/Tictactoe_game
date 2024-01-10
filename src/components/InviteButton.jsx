import React, { useState } from 'react';

const InviteButton = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const gameLink = window.location.href;
    navigator.clipboard.writeText(gameLink)
      .then(() => setCopied(true))
      .catch((error) => console.error('Error copying to clipboard:', error));

    // Reset the "copied" state after a short delay
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <button onClick={copyToClipboard} className='invitebutton'>
        Copy Game Link
      </button>
      
    </div>
  );
};

export default InviteButton;
