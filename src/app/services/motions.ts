export interface Motion {
  id: string;
  titleNL: string;
  titleFR: string;
  votingDate: string;
  votingResult: boolean;
  newDocumentReference?: DocumentReference;
  yesVotes: Votes;
  noVotes: Votes;
  absVotes: Votes;
}

export interface DocumentReference {
  spec: string;
  documentMainUrl?: string;
  subDocuments: SubDocument[];
}

export interface SubDocument {
  documentNr: number;
  documentSubNr: number;
  documentPdfUrl: string;
  summaryNL?: string;
  summaryFR?: string;

}

export interface MotionGroup {
  id: string;
  legislature: number;
  plenaryNr: number;
  titleNL: string;
  titleFR: string;
  motions: Motion[];
  votingDate: string;
}

export interface Votes {
  nrOfVotes: number;
  votePercentage: number;
  partyVotes: PartyVotes[]
}

export interface PartyVotes {
  partyName: string;
  votePercentage: number;
  numberOfVotes: number;
}
