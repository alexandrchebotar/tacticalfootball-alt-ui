import React from 'react';
import { ReactComponent as NationalPlayerIcon } from 'assets/national-player.svg';
import { ReactComponent as NationalProspectIcon } from 'assets/national-prospect.svg';
import { ReactComponent as CardNationIcon } from 'assets/card-nation.svg';
import { ReactComponent as CardIcon } from 'assets/card.svg';
import { ReactComponent as AuctionIcon } from 'assets/auction.svg';
import { ReactComponent as StabilisingIcon } from 'assets/stabilising.svg';
import { ReactComponent as TraininFormIcon } from 'assets/trainin-form.svg';
import { ReactComponent as InjuryIcon } from 'assets/injury.svg';

const StatusIcons = ({
  national_club_id,
  national_prospect_id,
  card_nation,
  card,
  auction_date,
  stabilising,
  training_form,
  injury
}) => {
  return (
    <div className="status-container">
      {national_club_id && <NationalPlayerIcon />}
      {!!national_club_id && national_prospect_id && <NationalProspectIcon />}
      {card_nation && <CardNationIcon />}
      {card && <CardIcon />}
      {auction_date && <AuctionIcon />}
      {stabilising && <StabilisingIcon />}
      {training_form && <TraininFormIcon />}
      {injury && <InjuryIcon />}
    </div>
  );
};

export default StatusIcons;
