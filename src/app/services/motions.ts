export interface Motion {
  id: string;
  titleNL: string;
  titleFR: string;
  descriptionNL: string;
  descriptionFR: string;
  votingDate: string;
  votingResult: boolean;
  yesVotes: Votes;
  noVotes: Votes;
  absVotes: Votes;
}

export interface MotionGroup {
  id: string;
  titleNL: string;
  titleFR: string;
  motions: Motion[];
  votingDate: string;
}

export interface Votes {
  nrOfVotes: number;
  partyVotes: PartyVotes[]
}

export interface PartyVotes {
  partyName: string;
  votePercentage: number;
  numberOfVotes: number;
}
