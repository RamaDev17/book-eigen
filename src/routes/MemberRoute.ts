import { Router } from "express";
import { createMember, deleteMember, detailMember, getAllMembers, updateMember } from "../controller/MemberController";

const MemberRoute = Router();

MemberRoute.get('/members', getAllMembers)
MemberRoute.post('/members', createMember)
MemberRoute.get('/members/:id', detailMember)
MemberRoute.put('/members/:id', updateMember)
MemberRoute.delete('/members/:id', deleteMember)

export default MemberRoute