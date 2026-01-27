"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Option<T> {
  value: T
  label: string
}

interface SearchableSelectProps<T> {
  value?: T
  onChange: (value: T) => void
  options: Option<T>[]
  placeholder: string
  disabled?: boolean
  name?: string
  required?: boolean
}

export function SearchableSelect<T extends string | number>({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  name,
  required,
}: SearchableSelectProps<T>) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={disabled}
          className="w-full justify-between h-12"
        >
          {value !== undefined ? options.find((o) => o.value === value)?.label : placeholder}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0"
        align="start"        // align dropdown with the left/start of the trigger
        side="bottom"        // force it to appear below
        sideOffset={4}>
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No results found</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value.toString()}
                onSelect={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>

        {name && value !== undefined && (
          <input type="hidden" name={name} value={value} required={required} />
        )}
      </PopoverContent>
    </Popover>
  )
}