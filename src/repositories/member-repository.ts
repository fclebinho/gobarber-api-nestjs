export abstract class MemberRepository {
  abstract create(name: string): Promise<void>;
}
