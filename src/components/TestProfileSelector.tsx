
import { bloodTestProfiles } from "@/data/sample-blood-tests";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TestProfileSelectorProps {
  selectedProfile: string;
  onProfileChange: (profile: string) => void;
}

const TestProfileSelector = ({ selectedProfile, onProfileChange }: TestProfileSelectorProps) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="font-medium text-gray-700">Test Profile:</span>
      <Select value={selectedProfile} onValueChange={onProfileChange}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Select profile" />
        </SelectTrigger>
        <SelectContent>
          {bloodTestProfiles.map((profile) => (
            <SelectItem key={profile.name} value={profile.name}>
              {profile.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TestProfileSelector;
